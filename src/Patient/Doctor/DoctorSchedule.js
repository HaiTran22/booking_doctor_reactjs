import React, {Component} from "react";
import { Connect } from "react-redux";
import './DoctorSchedule.scss';
import { connect } from "react-redux";
import moment from 'moment';
import localization from 'moment/locale/vi';
import { getscheduleDoctorByDate } from "../../services/userService";
import { FormattedMessage } from "react-intl";
import BookingModal from "./Modal/BookingModal";

class DoctorSchedule extends Component{
    constructor(props){
        super(props);
        this.state = {
            allDays: [],
            allAvalableTime:[],
            isOpenModalBooking:[],
            dataScheduleTimeModal:{},
        }
    }
    
    capitalizeFirstLetter(string){
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    async componentDidMount(){
        let {language} = this.props;
        let allDays = this.getArrDays(language);
            this.setState({
                allDays: allDays,
            })
    }

    getArrDays = (language) =>{
        let allDays = []
        for(let i = 0; i < 7; i++){
            let object = {};
            if(i ===0){
                let labelVi2 = moment(new Date()).format('DD/MM');
                let today = 'Hôm nay - ${labelVi2} '
                object.label = today;
            }else{
                let labelVi = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
                object.label = this.capitalizeFirstLetter(labelVi);
            }
            allDays.push(object);
        }
        return allDays;
    }

    async componentDidUpdate(prevProps, prevState, snapshot){
        // if(this.props.language !== prevProps.language){
        //     let allDays = this.getArrDays(this.props.language);
        //     this.setState({
        //         allDays: allDays,
        //     })
        // }
        if ( this.props.doctorIdFromParent !== prevProps.doctorIdFromParent){
            // let res = await getscheduleDoctorByDate(this.props.doctorIdFromParent, allDays[0].value);
            // this.setState({
            //     allAvalableTime: res.data ? res.data : []
            // })
        }
    }

    //bấm select thay đổi 
    handleOnChangeSelect = async (event) =>{
        if( this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1){
            let doctorId = this.props.doctorIdFromParent;
            let date = event.target.value;

            // check lại có chạy thành công kh
            let res = await getscheduleDoctorByDate(doctorId, date);
            
            if(res && res.errCode === 0){
                this.setState({
                    allAvalableTime: res.data ? res.data : []
                })
            }
            console.log('check res schedule from react: ', res);
        }
    }

    handleClickScheduleTime = (time) =>{
        this.setState({
            isOpenModalBooking: true,
            dataScheduleTimeModal: time,
        })
        console.log('Time: ', time)
    }

    closeBookingClose = () =>{
        this.setState({
            isOpenModalBooking: false
        })
    }
    render(){
        let {allDays, allAvalableTime, isOpenModalBooking, dataScheduleTimeModal} = this.state;
        // let {language} = this.poprs;
        
        return(
            <>
                <div className="doctor-schedule-container">
                    <div className="all-schedule">
                        <select onChange={(event) => this.handleOnChangeSelect(event)}>
                            {allDays && allDays.length > 0 && allDays.map((item, index ) =>{
                                return(
                                    <option 
                                        value={item.value} 
                                        key={index}> 
                                            {item.lable} 
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="all-available-time">
                            <div className="text-calendar">
                                <i className="fal fa-calendar-alt"><span>Lịch khám</span></i>
                            </div>
                            <div className="time-content">
                                {allAvalableTime && allAvalableTime.length > 0 ?
                                <React.Fragment>
                                    <div className="time-content-btns">
                                    {
                                        allAvalableTime.map((item, index) =>{
                                            let timeDisplay = item.timeTypeData.value;
                                            // let timeDisplay = language = LANGUAGES.VI ?
                                            //     item.timeTypeData.valueVi : item.timeTypeData.valueEn;
                                            return (
                                                <button 
                                                    key={index} 
                                                    /*className={language === LANGUAGES.VI ? 'btn-vie' : 'btn-en'}*/
                                                    onClick={()=> this.handleClickScheduleTime(item)}
                                                >
                                                    {item.timeDisplay}
                                                </button>
                                            )
                                        })
                                    }
                                    </div>
                                    
                                    <div className="book-free">
                                        <span>Chọn <i className="far fa-hand-point-up"></i> và đặt (miễn phí)</span>
                                    </div>
                                </React.Fragment> 
                                    :
                                    <div>Hiện tại bác sĩ không có lịch hẹn trong thời gian này, vui lòng chọn thời gian khác!</div>
                                }
                                
                            </div>
                    </div>
                </div>

                <BookingModal 
                    isOpenModal ={isOpenModalBooking}
                    closeBookingClose ={this.closeBookingClose}
                    dataTime= {dataScheduleTimeModal}
                />
            </>
        );
        
    }
}

// const mapStateToProps = state =>{
//     return{
//         language: state.app.language,
//     };
// };

const mapDispatchToProps = dispatch =>{
    return{

    };
};

export default connect (mapDispatchToProps)(DoctorSchedule);