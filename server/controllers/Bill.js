const { StatusCodes } = require("http-status-codes");
const Admission = require("../models/Admission");
const Bill = require("../models/Bill");
const getBills = async (req, res) => {
  const bills = await Bill.find({})
    .populate("admission_id")
    .populate("patient_id");

  res.status(StatusCodes.OK).json({ bills });
};
const addBill = async (req, res) => {
  const bill = await Bill.create(req.body);
  const admission = await Admission.findByIdAndUpdate(req.body.admission_id, {
    bill_id: bill._id,
  });
  console.log(admission);

  res.status(StatusCodes.OK).json({ bill });
};
const getBill = async (req, res) => {
  const { billId } = req.params;
  const bill = await Bill.findById(billId)
    .populate("admission_id")
    .populate("patient_id")
    .populate({
      path: "admission_id",
      populate: {
        path: "insurance_id",
        model: "InsuranceCarrier",
      },
    })
    .populate({
      path: "admission_id",
      populate: {
        path: "doctor_id",
        model: "doctor",
      },
    })
    .populate({
      path: "admission_id",
      populate: {
        path: "treatments",
        model: "Treatment",
      },
    });
  res.status(StatusCodes.OK).json({ bill });
};
const getBillByPatient = async (req, res) => {
  const { id } = req.params;
  const bill = await Bill.find({ patient_id: id });

  res.status(StatusCodes.OK).json({ bill });
};
module.exports = { getBills, addBill, getBill, getBillByPatient };
