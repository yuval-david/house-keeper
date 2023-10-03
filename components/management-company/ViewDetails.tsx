import React from 'react'
import style from "./ViewDetails.module.css"
import BusinessIcon from '@mui/icons-material/Business';
import PersonIcon from '@mui/icons-material/Person';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import EmailIcon from '@mui/icons-material/Email';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { CompanyInformation } from '@/Types/objects_types';

export function ViewDetails({
  information
}: {
  information: CompanyInformation
}) {
  return (
    <div className={style.details_container}>

      <div className={style.main_details}>

        <div className={style.detail}>
          <div className={style.title}>
            <span className={style.icon}><BusinessIcon /></span>
            <div className={style.label}>שם חברת הניהול</div>
          </div>
          <div className={style.data}>{information.name}</div>
        </div>
        <div className={style.detail}>
          <div className={style.title}>
            <span className={style.icon}><PersonIcon /></span>
            <div className={style.label}>שם הנציג</div>
          </div>
          <div className={style.data}>{information.representativename}</div>
        </div>
        <div className={style.detail}>
          <div className={style.title}>
            <span className={style.icon}><PhoneEnabledIcon /></span>
            <div className={style.label}>מספר טלפון</div>
          </div>
          <div className={style.data}>{information.phone}</div>
        </div>
        <div className={style.detail}>
          <div className={style.title}>
            <span className={style.icon}><EmailIcon /></span>
            <div className={style.label}>כתובת מייל</div>
          </div>
          <div className={style.data}>{information.email}</div>
        </div>

      </div>

      <div className={style.more_details}>
        <h2>
          <span>
            <AccountBalanceIcon />
          </span>
          <span>
            פרטי חשבון לתשלום
          </span>
        </h2>
        <div className={style.grouped_items}>
          <div className={style.detail}>
            <div className={style.title}>שם המוטב</div>
            <div className={style.data}>{information.paymentname}</div>
          </div>
          <div className={style.detail}>
            <div className={style.title}>מספר חשבון</div>
            <div className={style.data}>{information.paymentaccountnumber}</div>
          </div>
          <div className={style.detail}>
            <div className={style.title}>שם הבנק</div>
            <div className={style.data}>{information.paymentbankname}</div>
          </div>
          <div className={style.detail}>
            <div className={style.title}>מספר סניף</div>
            <div className={style.data}>{information.paymentbranch}</div>
          </div>
        </div>

      </div>

    </div>
  )
}
