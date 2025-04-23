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
      </div>
    </>
  );
};
export default PreviewPage;
