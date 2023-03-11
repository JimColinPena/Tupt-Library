import React, { Fragment, useState, useEffect, useRef } from 'react'
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";
import { ExcelExport, ExcelExportColumn } from '@progress/kendo-react-excel-export';
import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";
import '@progress/kendo-theme-default/dist/all.css';
import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import SideNavbarAdmin from '../layout/SideNavbarAdmin'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { bookReports, clearErrors } from '../../actions/bookActions'
import { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell } from "docx";
import { saveAs } from 'file-saver';
const BookAccessionReports = () => {

    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, books } = useSelector(state => state.getbookReports);
    // const [subjectFilter, setSubjectFilter] = useState('');
    const [subjectFilter] = useState('');
    const nowDate = new Date();
    const formatDate = nowDate.toLocaleString('en-US', {
        dateStyle: 'long'
    })

    useEffect(() => {
        dispatch(bookReports(subjectFilter))

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

    }, [dispatch, alert, error, subjectFilter])

    const container = React.useRef(null);
    const pdfExportComponent = React.useRef(null);

    const exportPDFWithMethod = () => {
        let element = container.current || document.body;
        savePDF(element, {
            paperSize: "A4",
            // paperSize: "A4",
            scale: 0.60,
            margin: 20,
            fileName: `BOOK ACCESSION LIST (${formatDate})`,
            author: 'TUP-T LRC',
            landscape: true
        });
    };

    const _export = React.useRef(null);
    const excelExport = () => {
        save(_export);
    };

    const save = (component) => {
        const options = component.current.workbookOptions();
        const rows = options.sheets[0].rows;
        const columns = options.sheets[0].columns;
        // let altIdx = 0;
        // rows.forEach((row) => {
        //     if (row.type === "data") {
        //         if (altIdx % 2 !== 0) {
        //             row.cells.forEach((cell) => {
        //                 cell.background = "#aabbcc";
        //             });
        //         }
        //         altIdx++;
        //     }
        // });

        component.current.save(options);
    };

    const bookTitle = [];
    // const bookArr = books.book
    // bookArr.forEach((e, index )=> {
    //     bookTitle.push(e.title)
    // });
    if (books.book != null || books.book != undefined) {
        const bookArr = books.book
        // console.log(bookArr)

        bookArr.forEach((e, index) => {
            bookTitle.push(e)
        });
    }

    // console.log(bookArr)
    console.log(bookTitle)

    const table = new Table({
        rows: [
            new TableRow({
                children: [
                    new TableCell({
                        children: [new Paragraph("Accession")],
                    }),
                    new TableCell({
                        children: [new Paragraph("Title")],
                    }),
                    new TableCell({
                        children: [new Paragraph("Author")],
                    }),
                    new TableCell({
                        children: [new Paragraph("Publisher")],
                    }),
                    new TableCell({
                        children: [new Paragraph("Year")],
                    }),
                    new TableCell({
                        children: [new Paragraph("ISBN")],
                    }),
                    new TableCell({
                        children: [new Paragraph("Call Number")],
                    }),
                    new TableCell({
                        children: [new Paragraph("Location")],
                    }),
                ],
            }),
        ],
    });
    const doc = new Document({
        sections: [
            {
                children: [table],
            },
        ],
    });

    const docxExport = () => {
        Packer.toBlob(doc).then((blob) => {
            saveAs(blob, "example.docx");
        });
    };

    return (
        <Fragment>
            <MetaData title={'TUP-T Online Library - Admin'} />
            <SideNavbarAdmin />
            {loading || loading === undefined ? <Loader /> : (
                <div className="management-content">
                    <div className="management-body">
                        <div className="example-config">
                            <h4>Export to:</h4>
                            {/* &nbsp; */}
                            <button className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onClick={exportPDFWithMethod}>
                                PDF
                            </button>
                            <button
                                className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
                                onClick={excelExport}
                            >
                                EXCEL
                            </button>
                            <button
                                className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
                                onClick={docxExport}
                            >
                                WORD
                            </button>
                        </div>
                        <div className="border rounded p-2">
                            {/* <ExcelExport data={books.book} ref={_export}> */}
                            <PDFExport ref={pdfExportComponent} paperSize="auto" margin={40} fileName={`Report for ${formatDate}`} author="KendoReact Team">
                                <div ref={container}>
                                    <h3 className="text-center"><strong>TUPT LRC</strong></h3>
                                    <br />
                                    <h3 className="text-center"><strong>BOOK ACCESSION LIST</strong></h3>
                                    <br />
                                    <h5 className="text-center">{formatDate}</h5>
                                    <hr className="k-hr" />
                                    <Grid style={{
                                        // height: "400px",
                                        overflowY: 'hidden'
                                    }} data={books.book}
                                        resizable={true}
                                        scrollable='none'
                                    >
                                        {/* <Column field="accession_numbers.accession_number" title="Accession" width={210} /> */}
                                        <Column field="accession_numbers" title="Accession" />
                                        <Column field="title" title="Title" />
                                        <Column field="main_author" title="Author" />
                                        <Column field="publisher" title="Publisher" />
                                        <Column field="yearPub" title="Year" />
                                        <Column field="isbn" title="ISBN" />
                                        <Column field="call_number" title="Call Number" />
                                        <Column field="location" title="Location" />
                                    </Grid>
                                </div>

                            </PDFExport>
                            {/* </ExcelExport> */}
                        </div>
                        <ExcelExport
                            data={books.book}
                            ref={_export}
                            fileName={`BOOK ACCESSION LIST (${formatDate})`}
                        >
                            <ExcelExportColumn field="accession_numbers" title="Accession" />
                            <ExcelExportColumn field="title" title="Title" />
                            <ExcelExportColumn field="main_author" title="Author" />
                            <ExcelExportColumn field="publisher" title="Publisher" />
                            <ExcelExportColumn field="yearPub" title="Year" />
                            <ExcelExportColumn field="isbn" title="ISBN" />
                            <ExcelExportColumn field="call_number" title="Call Number" />
                            <ExcelExportColumn field="location" title="Location" />
                        </ExcelExport>

                    </div>
                </div>
            )
            }
        </Fragment>
    )
};
export default BookAccessionReports