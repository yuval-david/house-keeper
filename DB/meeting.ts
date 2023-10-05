import {google} from 'googleapis';
import {authenticate} from '@google-cloud/local-auth'
import path from "path";
import * as fs from "fs";
import {end} from "@popperjs/core";

const TOKEN_PATH = path.join(process.cwd(), 'token.json');
const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');

const SCOPES = ['https://www.googleapis.com/auth/calendar'];


/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<OAuth2Client|null>}
 */
async function loadSavedCredentialsIfExist() {
    try {
        const content = fs.readFileSync(TOKEN_PATH);
        const credentials = JSON.parse(content);
        let auth =  google.auth.fromJSON(credentials);
        const accesstoken = await auth.getAccessToken();
    } catch (err) {
        return null;
    }
}

/**
 * Serializes credentials to a file compatible with GoogleAUth.fromJSON.
 *
 * @param {OAuth2Client} client
 * @return {Promise<void>}
 */
async function saveCredentials(client) {
    const content = fs.readFileSync(CREDENTIALS_PATH);
    const keys = JSON.parse(content.toString());
    const key = keys.installed || keys.web;
    const payload = JSON.stringify({
        type: 'authorized_user',
        client_id: key.client_id,
        client_secret: key.client_secret,
        refresh_token: client.credentials.refresh_token,
    });
    fs.writeFileSync(TOKEN_PATH, payload);
}

/**
 * Load or request or authorization to call APIs.
 *
 */
async function authorize() {
    let client = await loadSavedCredentialsIfExist();
    if (client) {
        return client;
    }
    client = await authenticate({
        scopes: SCOPES,
        keyfilePath: CREDENTIALS_PATH,
    });
    if (client.credentials) {
        await saveCredentials(client);
    }
    console.log("Authorizer", client)
    return client;
}


export async function createMeeting(body) {
    console.log("creating meeting from", body)
    const auth = await authorize()
    const calendar = google.calendar({version: 'v3'});
    console.log("created calender")
    const {name, date, location, users, description, summary} = body;
    const event = {
        summary: name,
        description: description,
        location: location,
        start: {
            dateTime: date,
            timeZone: 'America/Los_Angeles',
        },
        end: {
            dateTime: new Date(new Date(date).getTime() + 3600000),  // Assumes 1 hour duration
            timeZone: 'America/Los_Angeles',
        },
        attendees: users.map(email => ({ email }))
    };

    const newEvent = calendar.events.insert({
        auth: auth,
        calendarId: 'primary',
        resource: event,
    });
    const id = await newEvent.then((res) => {
        console.log('Event created: %s');
        return res.data.id
    })
    console.log('id:', id);
    return id;
}