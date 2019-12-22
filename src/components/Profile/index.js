import React, { Component } from 'react'

import AddressField from './AddressField'
import TelNumberField from './TelNumberField'
import TextField from './TextField'
import ButtonRoute from '../Core/ButtonRoute'
import ProfileService from '../../services/ProfileService'

const { apiUrl } = window['runConfig'];

export default class Index extends Component {
  state = {
    profileData: [
      {
        labelInput: 'ชื่อ', placeHolder: 'สมชาย', name: 'firstName'
      },
      {
        labelInput: 'นามสกุล', placeHolder: 'ยอดชาย', name: 'lastName'
      },
      {
        labelInput: 'ชื่อ (ภาษาอังกฤษ)', placeHolder: 'Somchai', name: 'firstNameEn'
      },
      {
        labelInput: 'นามสกุล (ภาษาอังกฤษ)', placeHolder: 'Yodchai', name: 'lastNameEn'
      },
      {
        labelInput: 'ชื่อเล่น', placeHolder: 'สมชาย', name: 'nickName'
      },
      {
        labelInput: 'รหัสบัตรประชาชน / Passport Number', placeHolder: '1234567890987', name: 'citizenId'
      },
      {
        labelInput: 'สายการเรียน', placeHolder: 'วิทย์-ตณิต', name: 'major'
      }
    ],
    congenitalData: [
      {
        labelInput: 'อาหารที่แพ้', placeHolder: 'ข้าว', name: 'allergicFood'
      },
      {
        labelInput: 'โรคประจำตัว', placeHolder: 'ขาดข้าวไม่ได้', name: 'congenitalDisease'
      },
      {
        labelInput: 'ยาที่แพ้', placeHolder: 'ยาแก้แพ้', name: 'congenitalDrug'
      }
    ],
    religionData: ['เลือกศาสนา', 'พุทธ', 'คริสต์', 'อิสลาม', 'ฮินดู', 'ซิกส์'],
    booldGroupData: ['เลือกกรู๊ปเลือด', 'O', 'A', 'B', 'AB'],
    district: '',
    province: '',
    data: {
      firstName: null,
      firstNameEn: null,
      lastName: null,
      lastNameEn: null,
      nickName: null,
      citizenId: null,
      major: null,
      telNo: null,
      gender: null,
      birthDate: null,
      bloodGroup: null,
      religion: null,
      school: null,
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
    }
  }

  
  async componentDidMount() {
    await this.getProfileService();
    // console.log(this.state.data);
  }

  componentDidUpdate() {
    console.log(this.state.data)
  }

  getProfileService = async () => {
    let data = await ProfileService.getProfile(1);
    // console.log(data)
  }

  putProFileService = async (data , e) => {
    e.preventDefault()
    let data1 = await ProfileService.putProfile(data)
    console.log(data)
    console.log(data1)
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  
  onSelect = (fullAddress) => {
    const { district, province } = fullAddress
    this.setState({
      district,
      province
    })
    this.arrayToObj(fullAddress);
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
    // console.log(2)
    const { name, value } = event.target;
    if (name === "parentRelation" || name === "parentTel"){
      const newName = name === "parentRelation" ? "relation" : "tel"
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
    }
    this.setState((prevState) => ({
      data: {
        ...prevState.data,
        [name]: value
      }
    }
    ))
  }

  render() {
    return (
      <React.Fragment>
        <h1 className="col-12">ข้อมูลส่วนตัว</h1>
        {
          this.state.profileData.map((data, i) => (
            <TextField
              key={i}
              className="col-6"
              labelInput={data.labelInput}
              placeHolder={data.placeHolder}
              name={data.name}
              required="true"
              onChange={(e) => this.handleChange(e)}
            />
          ))
        }
        <label className="col-6" htmlFor="birthDate">
          วัน / เดือน / ปี เกิด
          <input
            type="date"
            name="birthDate"
            id="birthDate"
            min="1995-01-01"
            max="20010-12-31"
            value={this.state.birthDate}
            onChange={(e) => this.handleChange(e)}
            required
          />
        </label>
        <TelNumberField labelInput="เบอร์โทรศัพท์" name="telNo" onChange={(e) => this.handleChange(e)} />
        <label className="col-6" htmlFor="gender">
          เพศสภาพ
            <select name="gender" id="gender" required onChange={(e) => this.handleChange(e)}>
            <option value="">เลือกเพศ</option>
            <option value="ชาย">ชาย</option>
            <option value="หญิง">หญิง</option>
          </select>
        </label>
        <label className="col-6" htmlFor="bloodGroup">
          กรุ๊ปเลือด
            <select name="bloodGroup" id="bloodGroup" onChange={(e) => this.handleChange(e)}>
            {
              this.state.booldGroupData.map((data, i) => <option value={data} key={i}>{data}</option>)
            }
          </select>
        </label>
        <label className="col-6" htmlFor="religion">
          ศาสนา
            <select name="religion" id="religion" required onChange={(e) => this.handleChange(e)}>
            {
              this.state.religionData.map((data, i) => <option value={data} key={i}>{data}</option>)
            }
          </select>
        </label>
        <TextField
          className="col-6"
          labelInput="โรงเรียน"
          placeHolder="ส่วนบุญโญปภัมภ์ ลำพูน"
          name="school"
          required="true"
          onChange={(e) => this.handleChange(e)}
            />
        <label className="col-6" htmlFor="level">
          ระดับชั้น
            <select name="level" id="level" required onChange={(e) => this.handleChange(e)}>
            <option value="">เลือกระดับชั้น</option>
            <option value="ม.4">ม.4</option>
            <option value="ม.5">ม.5</option>
            <option value="ม.6">ม.6</option>
          </select>
        </label>
        <label className="col-6" htmlFor="gpax">
          GPAX
            <input type="number" id="gpax" min="1.00" max="4.00" name="gpax" placeholder="4.00" step="0.01" onChange={(e) => this.handleChange(e)} required />
        </label>
        <label className="col-6" htmlFor="email">
          e-mail
            <input type="email" id="email" name="email" placeholder="wipccamp@wip.camp" onChange={(e) => this.handleChange(e)} required />
        </label>
        {
          this.state.congenitalData.map((data, i) => (
            <TextField
              key={i}
              className="col-6"
              type="text"
              labelInput={data.labelInput}
              placeHolder={data.placeHolder}
              name={data.name}
              onChange={(e) => this.handleChange(e)}
            />
          ))
        }
        <div>
          <AddressField
            labelInput="เขต / อำเภอ"
            address="district"
            id="district"
            name="addrDistrict"
            value={this.state.district}
            onChange={(e) => this.onChange(e)}
            onSelect={(e) => this.onSelect(e)}
            placeholder="เขต / อำเภอ"
          />
          <AddressField
            labelInput="จังหวัด"
            address="province"
            id="province"
            name="addrProvice"
            value={this.state.province}
            onChange={(e) => this.onChange(e)}
            onSelect={(e) => this.onSelect(e)}
            placeholder="จังหวัด"
          />
        </div>

        <h1>ข้อมูลฉุกเฉิน</h1>
        <TextField
          type="text"
          labelInput="เกี่ยวข้องกับน้องยังไง"
          placeHolder="บิดา"
          name="parentRelation"
          required="false"
          onChange={(e) => this.handleChange(e)}
        />
        <TelNumberField labelInput="เบอร์โทรศัพท์" name="parentTel" onChange={(e) => this.handleChange(e)} />
        <TelNumberField labelInput="เบอร์ติดต่อฉุกเฉิน" name="telEmergency" onChange={(e) => this.handleChange(e)} />

        <ButtonRoute displayButtonLeft="none" linkNext="/major" onClick={(e) => this.putProFileService(this.state.data, e)} />
      </React.Fragment>
    )
  }
}
