import React, { Component } from 'react'
import {
  Radio
} from 'antd';
import 'antd/dist/antd.css';

import AddressField from '../Core/AddressField'
import TelNumberField from '../Core/TelNumberField'
import TextField from '../Core/TextField'
import ButtonRoute from '../Core/ButtonRoute'
import UserService from '../../services/UserService'
import Field from '../Core/Field'
import AlertModal from './AlertModal'

const { apiUrl } = window['runConfig'];

const userId = 120001;
export default class Index extends Component {
  state = {
    profileDataFirstSection: [
      {
        labelInput: 'ชื่อ', placeHolder: 'วิปโป้', name: 'firstName', additionalText:'ไม่ต้องใส่คำนำหน้าชื่อ'
      },
      {
        labelInput: 'นามสกุล', placeHolder: 'ใจดี', name: 'lastName'
      },
      {
        labelInput: 'Firstname', placeHolder: '', name: 'firstNameEn', additionalText:'ไม่ต้องใส่คำนำหน้าชื่อ'
      },
      {
        labelInput: 'Lastname', placeHolder: '', name: 'lastNameEn'
      },
      {
        labelInput: 'ชื่อเล่น', placeHolder: '', name: 'nickName'
      }
    ],

    profileDataSecondSection: [
      {
        labelInput: 'รหัสบัตรประชาชน', placeHolder: '', name: 'citizenId'
      }
    ],
    congenitalData: [
      {
        labelInput: 'โรคประจำตัว', placeHolder: 'หากไม่มีให้ใส่ -', name: 'congenitalDisease'
      },
      {
        labelInput: 'อาหารที่แพ้', placeHolder: 'หากไม่มีให้ใส่ -', name: 'allergicFood'
      },
      {
        labelInput: 'ยาที่แพ้', placeHolder: 'หากไม่มีให้ใส่ -', name: 'congenitalDrug'
      }
    ],
    religionData: ['เลือก', 'พุทธ', 'คริสต์', 'อิสลาม', 'ฮินดู', 'ซิกส์','ไม่มี'],
    booldGroupData: ['เลือก', 'A', 'B', 'O', 'AB'],
    district: '',
    province: '',
    data: {
      firstName: null,
      firstNameEn: null,
      lastName: null,
      lastNameEn: null,
      nickName: null,
      citizenId: null,
      telNo: null,
      gender: null,
      birthDate: null,
      bloodGroup: null,
      religion: null,
      schoolMajor: null,
      level: null,
      gpax: null,
      email:null,
      allergicFood: null,
      congenitalDisease: null,
      congenitalDrug: null,
      parent: {
        relation: null,
        telNo: null
      },
      telEmergency: null,
      address: {
        province: null,
        district: null
      }
    },
    errorMsg: []
  }

  
  async componentDidMount() {
    this.validateField(this.state.data);
  }

  componentDidUpdate() {
    console.log(this.state.data)
  }

  getUserService = async () => {
    let data = await UserService.getUser(userId);
    // console.log(data)
  }

  validateField = (data) => {
    let requiredField = [];
    const nonRequireKey = [
      "allergicFood",
      "congenitalDisease",
      "congenitalDrug"
    ];
    Object.keys(data).map((keyData)=>{
      if(!nonRequireKey.includes(keyData,0)){
        if(data[keyData] == null){
          requiredField.push(keyData)
        }
      }
    })
    this.setState({errorMsg:requiredField})
    console.log("done validate");
  }
  putUser = async (data) => {
    await UserService.putUser(userId, data);
  }
  
  onSelect = (fullAddress) => {
    const { district, province } = fullAddress
    this.setState({
      district,
      province
    })
    this.arrayToObj(fullAddress)
  }

  arrayToObj = (fullAddress) => {
    const dataEntries = Object.entries(fullAddress)
    for (const [dataArray, dataFromEntity] of dataEntries) {
      if (dataArray === "district" || dataArray === "province") {
        this.setState((prevState) => ({
          data: {
            ...prevState.data,
            address: {
              ...prevState.data.address,
              [dataArray]:dataFromEntity
            }
          }
        })
        )
      } 
    }
  }

  handleClick = () => {
    this.setState({
      religion: true
    })
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "district" || name === "province") {
      this.setState((prevState) => ({
        data: {
          ...prevState.data,
          address: {
            ...prevState.data.address,
            [name]: value
          }
        }
      })
      )
    }
   else if (name === "parentRelation" || name === "parentTel"){
      const newName = name === "parentRelation" ? "relation" : "telNo"
      this.setState((prevState) => ({
        data: {
          ...prevState.data,
          parent:{
            ...prevState.data.parent,
            [newName] : value
          }
        }
      }
      ))
    }else{
    this.setState((prevState) => ({
      data: {
        ...prevState.data,
        [name]: value
      }
    }
    ))
    }
    this.validateField(this.state.data);
  }

  displayNextButton = () => {
    if(this.state.errorMsg.length === 0 || this.state.errorMsg == null){
      return <ButtonRoute displayButtonLeft="none" linkNext="/general" onClick={(e) => this.putUser(this.state.data)} />
    }else{
      return <AlertModal errorMsg={this.state.errorMsg} />
    }
  }

  render() {
    return (
        <div className ="container">
          <section>
          <h3 className="col-12">ข้อมูลส่วนตัว</h3>
          {
            this.state.profileDataFirstSection.map((data, i) => (
              <TextField
                key={i}
                className="col-12 col-md-6 form-group"
                leftSide="col-12 col-md-4 col-form-label text-md-right"
                rightSide="col-12 col-md-8"
                labelInput={data.labelInput}
                placeHolder={data.placeHolder}
                name={data.name}
                onChange={(e) => this.handleChange(e)}
                additional="form-text text-muted"
                additionalText={data.additionalText}
                required
              />
            ))
          }

          <label className="col-12 col-md-6 form-group" htmlFor="gender">
            <div className="row">
              <div className="col-12 col-md-4 col-form-label text-md-right">เพศสภาพ</div>
              <div className="col-12 col-md-8">
                <Radio.Group onChange={(e) => this.handleChange(e)} name="gender">
                    <Radio.Button value="ชาย">ชาย</Radio.Button>
                    <Radio.Button value="หญิง">หญิง</Radio.Button>
                </Radio.Group>
              </div>
            </div>
          </label>
          <label className="col-12 col-md-6 form-group" htmlFor="birthDate">
            <div className="row">
              <div className="col-12 col-md-4 col-form-label text-md-right">วันเกิด</div>
              <div className="col-12 col-md-8">
                <input
                  className="form-control" 
                  type="date"
                  name="birthDate"
                  id="birthDate"
                  min="1995-01-01"
                  max="20010-12-31"
                  value={this.state.birthDate}
                  onChange={(e) => this.handleChange(e)}
                  required
                />
              </div>
            </div>
          </label>

          <label className="col-12 col-md-6 form-group" htmlFor="religion">
            <div className="row">
              <div className="col-12 col-md-4 col-form-label text-md-right">ศาสนา</div>
              <div className="col-12 col-md-8">
                <select className="form-control" name="religion" id="religion" onChange={(e) => this.handleChange(e)} required>
                {this.state.religionData.map((data, i) => <option value={data} key={i}>{data}</option>)}
                </select>
              </div>
            </div>
          </label>

          {
            this.state.profileDataSecondSection.map((data, i) => (
              <TextField
                key={i}
                className="col-12 col-md-6 form-group"
                leftSide="col-12 col-md-4 col-form-label text-md-right"
                rightSide="col-12 col-md-8"
                labelInput={data.labelInput}
                placeHolder={data.placeHolder}
                name={data.name}
                onChange={(e) => this.handleChange(e)}
                additional="form-text text-muted"
                additionalText={data.additionalText}
                required
              />
            ))
          }
          
          <label className="col-12 col-md-6 form-group" htmlFor="bloodGroup">
            <div className="row">
              <div className="col-12 col-md-4 col-form-label text-md-right">กรุ๊ปเลือด</div>
              <div className="col-12 col-md-8">
                <select className="form-control" name="bloodGroup" id="bloodGroup" onChange={(e) => this.handleChange(e)} required>
                {this.state.booldGroupData.map((data, i) => <option value={data} key={i}>{data}</option>)}
                </select>
              </div>
            </div>
          </label>

          
          {
            this.state.congenitalData.map((data, i) => (
              <TextField
                key={i}
                className="col-12 col-md-6 form-group"
                leftSide="col-12 col-md-4 col-form-label text-md-right"
                rightSide="col-12 col-md-8"
                type="text"
                labelInput={data.labelInput}
                placeHolder={data.placeHolder}
                name={data.name}
                onChange={(e) => this.handleChange(e)}
              />
            ))
          }
          </section>

          <section>
          <h3 className="col-12">ข้อมูลการติดต่อ</h3>

          <AddressField
            className="col-12 col-md-6 form-group"
            leftSide="col-12 col-md-4 col-form-label text-md-right"
            rightSide="col-12 col-md-8"
            labelInput="จังหวัด"
            address="province"
            id="province"
            name="addrProvice"
            value={this.state.data.address.province}
            onChange={(e) => this.handleChange(e)}
            onSelect={(e) => this.onSelect(e)}
            placeholder="เลือก"
            required
          />

          <AddressField
            className="col-12 col-md-6 form-group"
            leftSide="col-12 col-md-4 col-form-label text-md-right"
            rightSide="col-12 col-md-8"
            labelInput="เขต / อำเภอ"
            address="district"
            id="district"
            name="addrDistrict"
            value={this.state.data.address.district}
            onChange={(e) => this.handleChange(e)}
            onSelect={(e) => this.onSelect(e)}
            placeholder="เลือก"
            required
          />

          <TelNumberField labelInput="เบอร์โทรศัพท์" name="telNo" onChange={(e) => this.handleChange(e)} required/>  
          <Field
            className="col-12 col-md-6 form-group"
            name="email"
            type="email"
            labelInput="E-Mail"
            placeHolder=""
            onChange={(e) => this.handleChange(e)} 
            required="required" />
          <TelNumberField labelInput="เบอร์โทรผู้ปกครอง" name="parentTel" onChange={(e) => this.handleChange(e)} required/>
          <TextField
            className="col-12 col-md-6 form-group"
            leftSide="col-12 col-md-4 col-form-label text-md-right"
            rightSide="col-12 col-md-8"
            type="text"
            labelInput="ผู้ปกครองเกี่ยวข้องเป็น"
            placeHolder=""
            name="parentRelation"
            onChange={(e) => this.handleChange(e)}
            required
          />
          <TelNumberField labelInput="เบอร์โทรฉุกเฉิน" name="telEmergency" onChange={(e) => this.handleChange(e)} required/>
          </section>
          <section>
          <h3 className="col-12">ข้อมูลการศึกษา</h3>
          <TextField
            className="col-12 col-md-6 form-group"
            leftSide="col-12 col-md-4 col-form-label text-md-right"
            rightSide="col-12 col-md-8"
            labelInput="โรงเรียน"
            placeHolder="เลือก"
            name="school"
            onChange={(e) => this.handleChange(e)}
            required
            />
          <label className="col-12 col-md-6 form-group" htmlFor="level">
            <div className="row">
              <div className="col-12 col-md-4 col-form-label text-md-right">ระดับชั้น</div>
              <div className="col-12 col-md-8">
                <select className="form-control" name="level" id="level" onChange={(e) => this.handleChange(e)}  required>
                  <option value="">เลือก</option>
                  <option value="ม.4">ม.3 ขึ้น ม.4</option>
                  <option value="ม.5">ม.4 ขึ้น ม.5</option>
                  <option value="ม.6">ม.5 ขึ้น ม.6</option>
                </select>
              </div>
            </div>
          </label>
          <TextField
            className="col-12 col-md-6 form-group"
            leftSide="col-12 col-md-4 col-form-label text-md-right"
            rightSide="col-12 col-md-8"
            labelInput="สายการเรียน"
            placeHolder="เลือก"
            name="schoolMajor"
            onChange={(e) => this.handleChange(e)}
            required
            />
          <Field
            className="col-12 col-md-6 form-group"
            name="gpax"
            type="number"
            labelInput="เกรดเฉลี่ย"
            placeHolder=""
            step="0.01"
            min="1.00"
            max="4.00"
            onChange={(e) => this.handleChange(e)} 
            required="required" />
          </section>
          <h3 className="col-12">ผลงานและทักษะทางด้านคอมพิวเตอร์</h3>
          <textarea class="form-control" placeholder="ผลงาน" rows="4"></textarea>

          <ButtonRoute displayButtonLeft="none" linkNext="/general" onClick={(e) => this.putUser(this.state.data)} />
        </div>
    )
  }
}
