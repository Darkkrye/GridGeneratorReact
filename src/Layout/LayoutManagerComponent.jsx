import "./LayoutManagerComponent.scss";

import React, { PureComponent } from "react";

export default class LayoutManagerComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
      layout: [],
      columns: []
    };
  }

  addLineModal = () => {
    let { columns } = this.state;

    columns.push([
      <div className="col col-6" datasize={6} />,
      <div className="col col-6" datasize={6} />
    ]);

    this.setState({ isModalOpen: !this.state.isModalOpen, columns });
  };

  addLine = line => {
    let { layout, columns } = this.state;

    layout.push(<div>Execute Order 66</div>);

    this.setState({ layout, columns }, () => {
      this.addLineModal();
    });
  };

  removeLine = line => {
    let { layout, columns } = this.state;

    layout.splice(line, 1);
    columns.splice(line, 1);

    this.setState({ layout, columns });
    this.forceUpdate();
  };

  addColumn = () => {
    try {
      let { columns } = this.state;

      let lastIndex = columns.length - 1;
      let lastColumns = columns[lastIndex];
      let lastColumnIndex = lastColumns.length - 1;
      let lastColumn = lastColumns[lastColumnIndex];

      if (lastColumn.props.datasize > 1) {
        let lastDataSize = lastColumn.props.datasize;
        let newDataSize = lastDataSize / 2;

        if (Number.isInteger(newDataSize)) {
          columns[lastIndex][lastColumnIndex] = (
            <div className={"col col-" + newDataSize} datasize={newDataSize} />
          );
        } else {
          newDataSize = Math.floor(newDataSize);

          columns[lastIndex][lastColumnIndex] = (
            <div
              className={"col col-" + (lastColumn.props.datasize - newDataSize)}
              datasize={newDataSize + (lastColumn.props.datasize - newDataSize)}
            />
          );
        }

        lastColumns.push(
          <div className={"col col-" + newDataSize} datasize={newDataSize} />
        );

        this.setState({ columns });
        this.forceUpdate();
        console.log(this.state.columns);
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  getColumns = () => {
    let { columns } = this.state;
    let lastIndex = columns.length - 1;
    let lastColumn = columns[lastIndex];

    console.log("Last Column", lastColumn);

    return lastColumn;
  };

  render() {
    return (
      <div className="LayoutManagerComponent">
        {this.state.isModalOpen && (
          <div className="layout-modal" onClick={this.addLineModal}>
            <div
              className="layout-modal-content"
              onClick={e => {
                e.stopPropagation();
              }}
            >
              Add a line
              <br />
              <br />
              <div className="row">
                <div className="col-11">
                  <div className="row">{this.getColumns()}</div>
                </div>
                <div className="col-1">
                  <button
                    onClick={this.addColumn}
                    className="btn btn-success btn-add-column"
                  >
                    +
                  </button>
                </div>
              </div>
              <br />
              <button className="btn btn-success" onClick={this.addLine}>
                Validate
              </button>
            </div>
          </div>
        )}
        <div className="layout-manager">
          <button className="btn btn-primary" onClick={this.addLineModal}>
            Add Line
          </button>
        </div>

        <br />
        <div className="container layout">
          {this.state.layout.map((l, idx) => {
            return (
              <div className="row layout-part" key={idx}>
                <div className="col-11">{l}</div>
                <div className="col-1">
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      this.removeLine(idx);
                    }}
                  >
                    -
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
