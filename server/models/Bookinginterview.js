import mongoose from 'mongoose';

const BookedInterview=new mongoose.Schema({
    mock_id:{
      type:String,
      required:true   
    },
    score:{
      type:Number,
      required:true   
    },
    student_id:{
      type:String,
      required:true   
    },
    interviewer_id:{
        type:String,
        required:true
    },
    iscompleted:{
        type:Boolean,
        default:false   
      },
    bookingDate:{
        type:Date,
        required:true
    }
})
export default Interviews = mongoose.model('Interviews',BookedInterview);
