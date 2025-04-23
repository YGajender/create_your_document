import Head from 'next/head';
import { useEffect, useState } from 'react';
import { Container, Table } from 'react-bootstrap';

const PreviewPage = () => {
  const [fields, setFields] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('formData');
    if (saved) {
      setFields(JSON.parse(saved));
    }
  }, []);

  return (
    <>
      <Head>
        <title>NEET UG Counselling</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />
      </Head>

      <div style={{ position: 'relative' }}>
        <div className="SectionOne">
          <h1>
            <span className="highlight">NEET</span> COUNSELING
          </h1>
          <h2 className="headertext">RAJASTHAN</h2>
        </div>

        <Container className="my-4">
          {fields.map((field) => (
            <div key={field.id} className="mb-4 preview-block">
              {field.type === 'heading' && <h3 className="preview-heading">{field.content}</h3>}

              {field.type === 'paragraph' && <p className="preview-paragraph">{field.content}</p>}

              {field.type === 'list' &&
                (field.ordered ? (
                  <ol className="preview-list">
                    {field.content.map((item, i) => (
                      <li key={i}>
                        {item.text}
                        {item.sublist?.length > 0 && (
                          <ul>
                            {item.sublist.map((sub, j) => (
                              <li key={j}>{sub}</li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ol>
                ) : (
                  <ul className="preview-list">
                    {field.content.map((item, i) => (
                      <li key={i}>
                        {item.text}
                        {item.sublist?.length > 0 && (
                          <ul>
                            {item.sublist.map((sub, j) => (
                              <li key={j}>{sub}</li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                ))}

              {field.type === 'table' && (
                <>
                  <h5 className="preview-table-title">{field.content.title}</h5>
                  <Table bordered responsive className="preview-table">
                    <thead>
                      <tr>
                        {field.content.customHeaders?.map((header, idx) => (
                          <th key={idx}>{header}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {field.content.rows?.map((row, rowIdx) => (
                        <tr key={rowIdx}>
                          {row.map((cell, colIdx) => (
                            <td key={colIdx}>{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </>
              )}
            </div>
          ))}
        </Container>

        <style jsx global>{`
          .SectionOne {
            background: url('/pgCOUNSELINGBACK.jpg') no-repeat center center;
            background-size: cover;
            color: white;
            text-align: left;
            padding: 50px;
            height: 450px;
            display: flex;
            flex-direction: column;
            justify-content: center;
          }

          .SectionOne h1 {
            font-weight: bold;
            font-size: 80px;
            margin: 0;
          }

          .highlight {
            color: #20b486;
          }

          .headertext {
            font-weight: bold;
            font-size: 80px;
            margin: 0;
          }

          @media screen and (min-width: 1440px) {
            .SectionOne {
              padding: 80px;
              height: 550px;
            }

            .SectionOne h1,
            .highlight,
            .headertext {
              font-size: 100px;
            }
          }

          @media screen and (max-width: 1024px) {
            .SectionOne {
              padding: 40px;
              height: 350px;
            }

            .SectionOne h1,
            .highlight,
            .headertext {
              font-size: 60px;
            }
          }

          @media screen and (max-width: 768px) {
            .SectionOne {
              text-align: center;
              padding: 30px;
              height: 280px;
            }

            .SectionOne h1,
            .highlight,
            .headertext {
              font-size: 45px;
            }
          }

          @media screen and (max-width: 480px) {
            .SectionOne {
              padding: 20px;
              height: 220px;
            }

            .SectionOne h1,
            .highlight,
            .headertext {
              font-size: 35px;
            }
          }

          @media screen and (max-width: 320px) {
            .SectionOne {
              padding: 15px;
              height: 180px;
            }

            .SectionOne h1,
            .highlight,
            .headertext {
              font-size: 28px;
            }
          }

          .preview-block {
            padding: 10px 0;
            border-bottom: 1px solid #e0e0e0;
          }

          .preview-heading {
            font-size: 1.75rem;
            font-weight: 600;
            margin-bottom: 10px;
          }

          .preview-paragraph {
            font-size: 1.1rem;
            line-height: 1.6;
            margin-bottom: 10px;
          }

          .preview-list {
            padding-left: 1.5rem;
            margin-bottom: 10px;
          }

          .preview-table-title {
            font-weight: bold;
            margin-bottom: 10px;
          }

          .preview-table {
            background-color: #fff;
            border: 1px solid #dee2e6;
          }
        `}</style>
      </div>
    </>
  );
};
export default PreviewPage;
