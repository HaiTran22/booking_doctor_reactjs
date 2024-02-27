import React, {Component} from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { postVerifyBookAppointment } from "../../src/services/userService";
import HomeHeader from "../containers/HomePage/HomeHeader";
import "./VerifyEmail.scss";

class VerifyEmail extends Component{
    constructor(props){
        super(props);
        this.state = {
            statusVerify: false,
            errCode: 0,
        }
    }

    async componentDidMount(){
        console.log('>>> hello verify in here, props: ', this.props)
        if(this.props.location && this.props.location.search){
            let urlParams = new URLSearchParams(this.props.location.search);
            let token = urlParams.get('token');
            let doctorId = urlParams.get('doctorId');
            let res = await postVerifyBookAppointment({
                token: token,
                doctorId: doctorId
            })

            if(res & res.errCode === 0){
                this.setState({
                    statusVerify: true,
                    errCode: res.errCode,
                })
            }else{
                this.setState({
                    statusVerify: true,
                    errCode: res && res.errCode ? res.errCode : -1
                })
            }
            console.log('check token and doctorId >>>>:', token, doctorId)
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot){
        if(this.props.language !== prevProps.language){

        }
            
    }

    render(){    
        let {statusVerify, errCode} =this.state;
        console.log('check state>>>: ', this.state)
        return(
            <>
                <HomeHeader />
                <div className="verify-email-container">
                    {statusVerify === false ?
                        <div className="infor-booking">
                            loading data...
                        </div>
                        :
                        <div>
                            {+errCode === 0 ?
                                <div className="infor-booking">Xác nhận lịch hẹn thành công!</div>
                                :
                                <div className="infor-booking">Lịch hẹn không tồn tại hoặc đã được xác nhận</div>
                            }
                        </div>
                    }
                </div>
                
            </>
            
        );
        
    }
}

const mapDispatchToProps = dispatch =>{
    return{

    };
};

export default connect (mapDispatchToProps)(VerifyEmail);