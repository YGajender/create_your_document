// Final React Form Builder with nested list and table header options
import { useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';
import {
  Container,
  Button,
  Form,
  Row,
  Col,
  Table,
  Card,
  Alert,
} from "react-bootstrap";

const FormBuilder = () => {
  const [fields, setFields] = useState([
    { id: 1, type: "heading", content: "Heading 1" },
    { id: 2, type: "paragraph", content: "This is a paragraph." },
    { id: 3, type: "list", content: [], ordered: false },
  ]);

  const contentRef = useRef();

  const addField = (type) => {
    const newField = {
      id: Date.now(),
      type,
      content:
        type === "list"
          ? []
          : type === "table"
          ? { title: "", rows: [], headerType: "event" }
          : "",
      ordered: type === "list" ? false : undefined,
    };
    setFields([...fields, newField]);
  };

  const deleteField = (id) => {
    setFields(fields.filter((field) => field.id !== id));
  };

  const handleContentChange = (id, newContent) => {
    const updatedFields = fields.map((field) =>
      field.id === id ? { ...field, content: newContent } : field
    );
    setFields(updatedFields);
  };

  const addListItem = (id) => {
    setFields(
      fields.map((field) => {
        if (field.id === id && field.type === "list") {
          return {
            ...field,
            content: [...field.content, { text: "", sublist: [] }],
          };
        }
        return field;
      })
    );
  };

  const handleListItemChange = (id, index, newText) => {
    setFields(
      fields.map((field) => {
        if (field.id === id && field.type === "list") {
          const updated = [...field.content];
          updated[index].text = newText;
          return { ...field, content: updated };
        }
        return field;
      })
    );
  };

  const addSubListItem = (id, index) => {
    setFields(
      fields.map((field) => {
        if (field.id === id && field.type === "list") {
          const updated = [...field.content];
          updated[index].sublist.push("");
          return { ...field, content: updated };
        }
        return field;
      })
    );
  };

  const handleSubListItemChange = (id, i, j, newText) => {
    setFields(
      fields.map((field) => {
        if (field.id === id && field.type === "list") {
          const updated = [...field.content];
          updated[i].sublist[j] = newText;
          return { ...field, content: updated };
        }
        return field;
      })
    );
  };

  const addTableRow = (id) => {
    setFields(
      fields.map((field) => {
        if (field.id === id && field.type === "table") {
          const updatedRows = [...field.content.rows, ["", ""]];
          return { ...field, content: { ...field.content, rows: updatedRows } };
        }
        return field;
      })
    );
  };

  const deleteTableRow = (fieldId, rowIndex) => {
    setFields(
      fields.map((field) => {
        if (field.id === fieldId && field.type === "table") {
          const updatedRows = field.content.rows.filter(
            (_, idx) => idx !== rowIndex
          );
          return { ...field, content: { ...field.content, rows: updatedRows } };
        }
        return field;
      })
    );
  };

  const handleSubmit = () => {
    localStorage.setItem("formData", JSON.stringify(fields));
    window.location.href = "/preview";
  };

  // const handleDownloadPDF = async () => {
  //   const input = contentRef.current;
  //   if (input) {
  //     const canvas = await html2canvas(input);
  //     const imgData = canvas.toDataURL('image/png');
  //     const pdf = new jsPDF();
  //     const imgProps = pdf.getImageProperties(imgData);
  //     const pdfWidth = pdf.internal.pageSize.getWidth();
  //     const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  //     pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
  //     pdf.save('form-data.pdf');
  //   }
  // };

  return (
    <Container className="my-4">
      <h2 className="mb-4">Form</h2>
      <Row className="mb-3">
        <Col>
          <Button
            variant="primary"
            onClick={() => addField("heading")}
            className="me-2"
          >
            Add Heading
          </Button>
          <Button
            variant="primary"
            onClick={() => addField("paragraph")}
            className="me-2"
          >
            Add Paragraph
          </Button>
          <Button
            variant="primary"
            onClick={() => addField("list")}
            className="me-2"
          >
            Add List
          </Button>
          <Button variant="primary" onClick={() => addField("table")}>
            Add Table
          </Button>
          
        </Col>
      </Row>

      <div ref={contentRef}>
        {fields.map((field) => (
          <Card key={field.id} className="mb-3">
            <Card.Body>
              {field.type === "heading" && (
                <>
                  <Form.Control
                    type="text"
                    value={field.content}
                    onChange={(e) =>
                      handleContentChange(field.id, e.target.value)
                    }
                    placeholder="Enter heading"
                    className="mb-2"
                  />
                  <Button
                    variant="danger"
                    onClick={() => deleteField(field.id)}
                  >
                    Delete
                  </Button>
                </>
              )}

              {field.type === "paragraph" && (
                <>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={field.content}
                    onChange={(e) =>
                      handleContentChange(field.id, e.target.value)
                    }
                    placeholder="Enter paragraph"
                    className="mb-2"
                  />
                  <Button
                    variant="danger"
                    onClick={() => deleteField(field.id)}
                  >
                    Delete
                  </Button>
                </>
              )}

              {field.type === "list" && (
                <>
                  <Form.Check
                    type="switch"
                    id={`ordered-switch-${field.id}`}
                    label="Ordered List"
                    checked={field.ordered}
                    onChange={(e) =>
                      setFields(
                        fields.map((f) =>
                          f.id === field.id
                            ? { ...f, ordered: e.target.checked }
                            : f
                        )
                      )
                    }
                  />
                  <Button
                    size="sm"
                    onClick={() => addListItem(field.id)}
                    className="my-2"
                  >
                    Add Item
                  </Button>
                  {field.ordered ? (
                    <ol>
                      {field.content.map((item, i) => (
                        <li key={i}>
                          <Form.Control
                            type="text"
                            className="mb-1"
                            value={item.text}
                            onChange={(e) =>
                              handleListItemChange(field.id, i, e.target.value)
                            }
                            placeholder="List item"
                          />
                          <Button
                            size="sm"
                            onClick={() => addSubListItem(field.id, i)}
                            className="mb-1"
                          >
                            Add Sub-Item
                          </Button>
                          {item.sublist.length > 0 && (
                            <ul>
                              {item.sublist.map((sub, j) => (
                                <li key={j}>
                                  <Form.Control
                                    type="text"
                                    className="mb-1"
                                    value={sub}
                                    onChange={(e) =>
                                      handleSubListItemChange(
                                        field.id,
                                        i,
                                        j,
                                        e.target.value
                                      )
                                    }
                                    placeholder="Sub-item"
                                  />
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      ))}
                    </ol>
                  ) : (
                    <ul>
                      {field.content.map((item, i) => (
                        <li key={i}>
                          <Form.Control
                            type="text"
                            className="mb-1"
                            value={item.text}
                            onChange={(e) =>
                              handleListItemChange(field.id, i, e.target.value)
                            }
                            placeholder="List item"
                          />
                          <Button
                            size="sm"
                            onClick={() => addSubListItem(field.id, i)}
                            className="mb-1"
                          >
                            Add Sub-Item
                          </Button>
                          {item.sublist.length > 0 && (
                            <ul>
                              {item.sublist.map((sub, j) => (
                                <li key={j}>
                                  <Form.Control
                                    type="text"
                                    className="mb-1"
                                    value={sub}
                                    onChange={(e) =>
                                      handleSubListItemChange(
                                        field.id,
                                        i,
                                        j,
                                        e.target.value
                                      )
                                    }
                                    placeholder="Sub-item"
                                  />
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                  <Button
                    variant="danger"
                    onClick={() => deleteField(field.id)}
                  >
                    Delete
                  </Button>
                </>
              )}

              {field.type === "table" && (
                <>
                  <Form.Group className="mb-3">
                    <Form.Label>Table Title</Form.Label>
                    <Form.Control
                      type="text"
                      value={field.content.title || ""}
                      onChange={(e) =>
                        handleContentChange(field.id, {
                          ...field.content,
                          title: e.target.value,
                        })
                      }
                      placeholder="Enter table title"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Table Header Type</Form.Label>
                    <Form.Select
                      value={field.content.headerType || "event"}
                      onChange={(e) =>
                        handleContentChange(field.id, {
                          ...field.content,
                          headerType: e.target.value,
                        })
                      }
                    >
                      <option value="event">Event / Round - Dates</option>
                      <option value="category">Category - Fee (In Rs)</option>
                    </Form.Select>
                  </Form.Group>

                  <Table bordered hover>
                    <thead>
                      <tr>
                        {field.content.headerType === "event" && (
                          <>
                            <th>Event/Round</th>
                            <th>Dates</th>
                            <th>Action</th>
                          </>
                        )}
                        {field.content.headerType === "category" && (
                          <>
                            <th>Category</th>
                            <th>Fee (In Rs)</th>
                            <th>Action</th>
                          </>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {field.content.rows?.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                          <td>
                            <Form.Control
                              type="text"
                              value={row[0]}
                              onChange={(e) => {
                                const updatedRows = [...field.content.rows];
                                updatedRows[rowIndex][0] = e.target.value;
                                handleContentChange(field.id, {
                                  ...field.content,
                                  rows: updatedRows,
                                });
                              }}
                            />
                          </td>
                          <td>
                            <Form.Control
                              type="text"
                              value={row[1]}
                              onChange={(e) => {
                                const updatedRows = [...field.content.rows];
                                updatedRows[rowIndex][1] = e.target.value;
                                handleContentChange(field.id, {
                                  ...field.content,
                                  rows: updatedRows,
                                });
                              }}
                            />
                          </td>
                          <td>
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => deleteTableRow(field.id, rowIndex)}
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>

                  <div className="d-flex gap-2">
                    <Button
                      variant="secondary"
                      onClick={() => addTableRow(field.id)}
                    >
                      Add Row
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => deleteField(field.id)}
                    >
                      Delete Table
                    </Button>
                  </div>
                </>
              )}
            </Card.Body>
          </Card>
        ))}
      </div>

      <div className="d-flex gap-2 mt-3">
        <Button variant="success" onClick={handleSubmit}>
          Submit
        </Button>
        {/* <Button variant="info" onClick={handleDownloadPDF}>Download PDF</Button> */}
        {/* <Button variant="success" onClick={handleSubmit}>Next Page</Button> */}
      </div>
    </Container>
  );
};

export default FormBuilder;
