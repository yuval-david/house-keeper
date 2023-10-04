import { PageLayout } from '@/components/UI/PageLayout'
import React, { useState } from 'react'
import style from "../../styles/ContractPage.module.css"
import { PDFViewer } from '@/components/UI/PDFViewer';

export default function ContactPage() {

  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState("");
  const [selectedFileObject, setSelectedFileObject] = useState<File>();

  return (
    <PageLayout pageTitle='פרטי החוזה'>
        <div>
            <div className={style.pdf_container}>
                <PDFViewer/>
            </div>
            {/* <label>
                <input type='file' hidden/>
                <div className={style.upload_file_area}>

                </div>
            </label> */}
        </div>
    </PageLayout>
  )
}
