import {useForm} from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as StudentService from "./../service/StudentService"
import Swal from "sweetalert2";

function Create(){
    const {register, handleSubmit, formState: {errors}} = useForm();
    const navigate = useNavigate();
    const create = async (data) =>{
       await StudentService.create(data).then(
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Thêm mới thành công ',
                showConfirmButton: false,
                timer: 2000
            })
        )
        navigate('/')
    }

    const checkError = {
        name:{
            required:"Không được để trống nha mấy bạn!",
            minLength:{
                value:5,
                message:"Tên phải nhiều hơn 5 ký tự"}
              },
        dateOfBirth:{required:"Không được để trống nha mấy bạn !!"}
    }

    return(
        <form onSubmit={handleSubmit(create)}>
        <div className={"text-center"}>
            <h1>thêm mới</h1>
            <div style={{height:'100px'}}>
                <span>tên : </span>
                <input className={"form-control"} style={{width:'200px',marginLeft:'650px'}} placeholder={"tên"} {...register("name",checkError.name)}/>
                <span style={{color:'red'}}>{errors?.name && errors.name.message}</span>
            </div>
            <div style={{height:'100px'}}>
                <span>ngày sinh : </span>
                <input className={"form-control"} type={'date'} style={{width:'200px',marginLeft:'650px'}} placeholder={"ngày sinh"} {...register("dateOfBirth",checkError.dateOfBirth)}/>
                <span style={{color:'red'}}>{errors?.dateOfBirth && errors.dateOfBirth.message}</span>
            </div>
            <button type={"submit"} className={"btn btn-info"}>Lưu</button>
        </div>
        </form>
    )
}
export default Create