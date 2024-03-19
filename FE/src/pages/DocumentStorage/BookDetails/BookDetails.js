import React, { useCallback, useEffect, useRef, useState } from 'react';

import './BookDetails.css';
import Flip from '../../../components/Flip/Flip';
import { Document, Page, pdfjs } from 'react-pdf';
import HTMLFlipBook from 'react-pageflip';
import urlExam from '../../../assets/documents/math.pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
const PageCover = React.forwardRef((props, ref) => {
    return (
        <div className="page page-cover" ref={ref} data-density="hard">
            <div className="page-content">
                <h2>{props.children}</h2>
            </div>
        </div>
    );
});
const BookDetails = () => {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [pdfLoading, setPdfLoading] = useState(true); // Track PDF loading state

    useEffect(() => {
        // Initialize PDF when component mounts
        const loadPdf = async () => {
            try {
                const pdf = await pdfjs.getDocument(urlExam).promise;
                setNumPages(pdf.numPages);
                setPageNumber(1);
                setPdfLoading(false);
            } catch (error) {
                console.error('Error loading PDF:', error);
                setPdfLoading(false); // Update loading state on error
            }
        };

        loadPdf();
    }, []);

    const onFlip = useCallback((e) => {
        setCurrentPage(e.data);
    }, []);

    const book = useRef();

    return (
        <div className='bg-danger' style={{ minHeight: '100vh' }}>
            <header className="border-bottom bg-white sticky-header">
                <div className="d-flex align-items-center justify-content-between py-2 px-4">
                    <div className="d-flex align-items-center justify-content-center fw-bold fs-5 text-dark text-decoration-none">
                        <i className="fa-solid fa-angle-left pe-2 m-0"></i>
                        <span>Book title</span>
                    </div>
                </div>
            </header>
            <section>
                <div className="container bg-warning py-3 overflow-x-hidden">
                    {pdfLoading ? (
                        <div>Loading PDF...</div>
                    ) : (
                        <div className='d-flex flex-column align-items-center justify-content-center'>
                            <HTMLFlipBook
                                width={420}
                                height={600}
                                onFlip={onFlip}
                                ref={book}
                                className='bg-success'
                            >
                                <PageCover>BOOK TITLE</PageCover>
                                {Array.from(new Array(numPages), (el, index) => (
                                    <div key={`page_${index + 1}`} className="">

                                        <Document file={urlExam} >
                                            <Page
                                                pageNumber={index + 1}
                                                renderTextLayer={false}
                                                renderAnnotationLayer={false}
                                                width={420}
                                            />
                                        </Document>
                                    </div>
                                ))}
                            </HTMLFlipBook>

                        </div>
                    )}
                </div>
            </section>
            <footer className='d-flex gap-3 align-items-center justify-content-center bg-info bottom-0 position-sticky py-2 z-3'>
                <button onClick={() => book.current.pageFlip().flipPrev()} className='btn btn-outline-dark'><i className='fa-solid fa-angle-left'></i></button>
                <span>{currentPage} of {numPages}</span>
                <button onClick={() => book.current.pageFlip().flipNext()} className='btn btn-outline-dark'><i className='fa-solid fa-angle-right'></i></button>
            </footer>
        </div>
    );
};

export default BookDetails;
