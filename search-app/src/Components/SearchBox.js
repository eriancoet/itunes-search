import React from "react";
import icon from "../searchIcon.png";
import { Form, FormControl, Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

// SearchBox Component
function SearchBox(props) {
  return (
    <div className="searchBoxDiv">
      <img src={icon} alt="search icon" className="searchIconImg" />

      <Form id="searchBox">
        <Row className="align-items-center" style={{ width: "45rem" }}>
         
          <Col md={5}>
            <FormControl
              type="text"
              placeholder="Search Itunes"
              name="searchTerm"
              onChange={props.handleChangeSearchTerm}
            />
          </Col>
       
          <Col md={3}>
            <Form.Select
              aria-label="Select options"
              name="mediaType"
              onChange={props.handleChangeMediaType}
            >
              <option value="all">All types</option>
              <option value="movie">Movie</option>
              <option value="music">Music</option>
              <option value="software">Software</option>
            </Form.Select>
          </Col>
          <Col>
            <Button
              variant="light"
              type="button"
              onClick={props.handleSubmit}
            >
              Search
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default SearchBox;