import { Table, Button, Pagination } from 'rsuite';
import React from 'react';  
import 'rsuite/dist/rsuite.min.css';
import "./Table.css";
// import Data from "../../Data/Member.json";

const App = () => {
  let Data = [
    {
        "id":"011",
        "avatar":"/images/member/011.jpg",
        "name":"001",
        "position":"VIP",
        "adress":"Có 2 cái giường",
        "phone":"0937288111",
        "email":true,
        "salary":1000
    },
    {
        "id":"012",
        "avatar":"/images/member/012.jpg",
        "name":"002",
        "position":"Nor",
        "adress":"Có 2 cái giường",
        "phone":"0969696912",
        "email":false,
        "salary":4000
    },
    {
        "id":"013",
        "avatar":"/images/member/013.jpg",
        "name":"003",
        "position":"Nor",
        "adress":"Có 2 cái giường",
        "phone":"0122892888",
        "email":true,
        "salary":1000
    },
    {
        "id":"014",
        "avatar":"/images/member/014.jpg",
        "name":"004",
        "position":"VIP",
        "adress":"Có 2 cái giường",
        "phone":"0996781221",
        "email":true,
        "salary":1000
    },
    {
        "id":"015",
        "avatar":"/images/member/015.jpg",
        "name":"005",
        "position":"Nor",
        "adress":"Có 2 cái giường",
        "phone":"011119287",
        "email":false,
        "salary":500
    },
    {
        "id":"016",
        "avatar":"/images/member/016.jpg",
        "name":"006",
        "position":"Nor",
        "adress":"Có 2 cái giường",
        "phone":"0176379199",
        "email":true,
        "salary":1000
    },
    {
        "id":"017",
        "avatar":"/images/member/017.jpg",
        "name":"007",
        "position":"VIP",
        "adress":"Có 2 cái giường",
        "phone":"0288817219",
        "email":true,
        "salary":1000
    },
    {
        "id":"018",
        "avatar":"/images/member/018.jpg",
        "name":"009",
        "position":"Nor",
        "adress":"Có 2 cái giường",
        "phone":"012979192",
        "email":false,
        "salary":500
    },
    {
        "id":"019",
        "avatar":"/images/member/019.jpg",
        "name":"008",
        "position":"VIP",
        "adress":"Có 2 cái giường",
        "phone":"091273888",
        "email":true,
        "salary":500
    },
    {
        "id":"120",
        "avatar":"/images/member/020.jpg",
        "name":"008",
        "position":"Nor",
        "adress":"Có 2 cái giường",
        "phone":"012318881",
        "email":true,
        "salary":5000
    }
  ]
  const {Column, Cell, HeaderCell} = Table;
  const [sortColumn, setSortColumn] = React.useState();
  const [sortType, setSortType] = React.useState();
  const [loading, setLoading] = React.useState(false);

  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(1);

  const [modal, setModal] = React.useState(false);
  const [dataModal, setModalData] = React.useState({});

  const handleChangeLimit = dataKey => {
    setPage(1);
    setLimit(dataKey);
  };

  const [data, setData] = React.useState(Data.filter((v, i) => {
    const start = limit * (page - 1);
    const end = start + limit;
    return i >= start && i < end;
  }))

  const getData = () => {
    if (sortColumn && sortType) {
      return data.sort((a, b) => {
        let x = a[sortColumn];
        let y = b[sortColumn];
        if (typeof x === 'string') {
          x = +x
        }
        if (typeof y === 'string') {
          y = +y
        }
        if (sortType === 'asc') {
          return x - y;
        } else {
          return y - x;
        }
      });
    }
    return data;
  };

  const handleSortColumn = (sortColumn, sortType) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSortColumn(sortColumn);
      setSortType(sortType);
    }, 500);
  };

  const EditCell = ({ rowData, dataKey, onChange, ...props }) => {
    const editing = rowData.status === 'EDIT';
    return (
      <Cell {...props} className={editing ? 'table-content-editing' : ''}>
        {editing ? (
          <input
            className="rs-input"
            value={rowData[dataKey]}
            onChange={event => {
              onChange && onChange(rowData.id, dataKey, event.target.value);
            }}
          />
        ) : (
          <span className="table-content-edit-span">{rowData[dataKey]}</span>
        )}
      </Cell>
    );
  };

  const ActionCell = ({ rowData, dataKey, onClick, ...props }) => {
    return (
      <Cell {...props} style={{ padding: '6px' }}>
        <Button className="mx-1 position-relative action-button"
          onClick={() => {
            onClick(rowData.id); setModal(false)
          }}
        >
          <span className="action-cell">{rowData.status === 'EDIT' ? <i className="fa-solid fa-check save"></i> : <i className="fa-solid fa-pen-to-square edit"></i>}</span>
        </Button>
        <Button className="mx-1 position-relative action-button" 
          onClick={() => {
            setData(data.filter(item => item.id !== rowData.id)); setModal(false)
          }}
        ><span className="action-cell"><i className="fa-solid fa-trash-can"></i></span></Button>
      </Cell>
    );
  };

  const handleChange = (id, key, value) => {
    const nextData = Object.assign([], data);
    nextData.find(item => item.id === id)[key] = value;
    setData(nextData);
  };
  const handleEditState = id => {
    const nextData = Object.assign([], data);
    const activeItem = nextData.find(item => item.id === id);
    activeItem.status = activeItem.status ? null : 'EDIT';
    setData(nextData);
  };

  const Modal = () => {
    return (
      <>
      <div className={modal ? "d-block":"d-none"}>
        <div className="modal-container">
          <div className="modal-overley"></div>
          <div style={{animation: 'none'}} className="row modal-box py-3 align-items-center position-relative">
            <div onClick={() => setModal(modal ? false:true)} className="position-absolute times-button text-center"><i className="fa-solid fa-xmark"></i></div>
            <div className="col-4"><img className="w-100" src={dataModal.avatar} alt={dataModal.name} /></div>
            <div className="col-8">
              <h3>{dataModal.name}</h3>
              <span>{dataModal.position}</span>
              <div className="mt-4">
                <p><strong>Số điện thoại:</strong> {dataModal.phone}</p>
                <p><strong>Địa chỉ:</strong> {dataModal.adress}</p>
                <p><strong>Email:</strong> {dataModal.email}</p>
                <p><strong>Lương:</strong> {dataModal.salary} đô la</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      </>
    );
  }

  const [member, setMember] = React.useState(false)
  const [newMember, setNewMember] = React.useState({ id:"", name:"", position:"", phone:"", email:"", adress:"", salary:"" })

  const ModalTwo = () => {
    return (
      <>
      {member && (<div className="d-block">
        <div className="modal-container">
          <div className="modal-overley"></div>
          <div className="row modal-box py-3 align-items-center position-relative">
            <div onClick={() => setMember(false)} className="position-absolute times-button text-center"><i className="fa-solid fa-xmark"></i></div>
            <div className="w-100 text-center add-member-form">
                <h4 className="mb-2">Thêm một phòng mới</h4>
                <div>
                  <input type="text" placeholder="Mã phòng" 
                    value={ newMember.id }
                    onChange={e => setNewMember({...newMember, id: e.target.value})}
                  />
                </div>
                <div>
                  <input type="text" placeholder="Tên phòng" 
                    value={ newMember.name }
                    onChange={e => setNewMember({...newMember, name: e.target.value})}
                  />
                </div>
                <div>
                  <input type="text" placeholder="Loại phòng" 
                    value={ newMember.position }
                    onChange={e => setNewMember({...newMember, position: e.target.value})}
                  />
                </div>
                <div>
                  <input type="text" placeholder="Giá phòng" 
                    value={ newMember.phone }
                    onChange={e => setNewMember({...newMember, phone: e.target.value})}
                  />
                </div>
                <div>
                  <input type="text" placeholder="Tình trạng" 
                    value={ newMember.email }
                    onChange={e => setNewMember({...newMember, email: e.target.value})}
                  />
                </div>
                <button onClick={() => {setData(prev => [newMember, ...prev]); setMember(false)}} className="submit-btn" type="submit">Thêm vào</button>
            </div>
          </div>
        </div>
      </div>)}
      </>
    );
  }

  const StatusCell = ({ rowData, dataKey, onClick, ...props }) => {
    return (
      <Cell {...props} style={{ padding: '6px' }} className="text-center">
        <span className={`status-${!rowData[dataKey] ? "false" : "true"} d-inline-block`}>
            {!rowData[dataKey] ? "Tạm đóng" : "Đang mở"}
        </span>
      </Cell>
    );
  };

  return (
    <>
    <div className="add-member">
      <button onClick={() => setMember(true)}>Thêm Phòng Mới</button>
    </div>
    <Table
      height={460}
      data={getData()}
      sortColumn={sortColumn}
      sortType={sortType}
      onSortColumn={handleSortColumn}
      loading={loading}
      onRowClick={data => {
        setModalData(data)
      }}
    >
      <Column width={100} align="center">
        <HeaderCell>Mã phòng</HeaderCell>
        <Cell dataKey="id" onClick={()=>setModal(true)}/>
      </Column>
      <Column width={100} align="center">
        <HeaderCell>Số phòng</HeaderCell>
        <EditCell dataKey="name" onChange={handleChange} />
      </Column>
      <Column width={150} align="center">
        <HeaderCell>Loại phòng</HeaderCell>
        <EditCell dataKey="position" onChange={handleChange} />
      </Column>
      <Column width={180} sortable align="center">
        <HeaderCell>Giá phòng</HeaderCell>
        <EditCell dataKey="salary" onChange={handleChange} />
      </Column>
      <Column width={240} align="center">
        <HeaderCell>Mô tả</HeaderCell>
        <EditCell dataKey="adress" onChange={handleChange} />
      </Column>
      <Column width={180} align="center">
        <HeaderCell>Trạng thái</HeaderCell>
        <StatusCell dataKey="email" onChange={handleChange} />
      </Column>
      <Column width={145} align="center">
        <HeaderCell>Action</HeaderCell>
        <ActionCell dataKey="id" onClick={handleEditState} />
      </Column>
    </Table>
    <div className="pagination-box">
      {
            data &&
            <Pagination
                prev
                next
                first
                last
                ellipsis
                boundaryLinks
                maxButtons={5}
                size="xs"
                layout={[ '-', 'pager']}
                total={Data.length}
                limitOptions={[10, 20]}
                limit={limit}
                activePage={page}
                onChangePage={setPage}
                onChangeLimit={handleChangeLimit}
            />
        }
    </div>
    <Modal/>
    <ModalTwo />
    </>
  );
};

export default App