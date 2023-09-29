import React, { useState } from 'react'
import style from "./PDFViewer.module.css"
import { Document, Page, pdfjs } from 'react-pdf';
// import pdf worker as a url, see `next.config.js` and `pdf-worker.js`
import workerSrc from "../../pdf-worker";

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;
export function PDFViewer() {

	const [numPages, setNumPages] = useState<any>(null);
	const [pageNumber, setPageNumber] = useState<number>(1);

	const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
		setNumPages(numPages);
	};

	const goToPrevPage = () =>
		setPageNumber(pageNumber - 1 <= 1 ? 1 : pageNumber - 1);

	const goToNextPage = () =>
		setPageNumber(
			pageNumber + 1 >= numPages ? numPages : pageNumber + 1,
		);

	return (
		<div className={style.area_container}>
			<nav className={style.navigation}>
				<p>
					עמוד {pageNumber} מתוך {numPages}
				</p>
				<div className={style.buttons}>
					<button onClick={goToPrevPage}>הקודם</button>
					<button onClick={goToNextPage}>הבא</button>
				</div>
			</nav>

			<div className={style.container}>
				<Document
					file="/contracts/1/contract.pdf"
					onLoadSuccess={onDocumentLoadSuccess}
				>
					<Page renderTextLayer={false} pageNumber={pageNumber} className={style.pdf_page} />
				</Document>
			</div>
		</div>
	);

}
