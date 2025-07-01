import React, { useState } from "react";
import { useDispatch } from "react-redux";
import notify from "../useNotification";
import { addStation } from "../../redux/placeSlice"; // تأكد من أن هذا هو المسار الصحيح

const AddStationHook = () => {
  const dispatch = useDispatch();

  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [electionCenterId, setElectionCenterId] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitClicked, setSubmitClicked] = useState(false);

  const onChangeCode = (e) => setCode(e.target.value);
  const onChangeName = (e) => setName(e.target.value);
  const onChangeElectionCenterId = (e) => setElectionCenterId(Number(e.target.value));

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitClicked(true);
    setLoading(true);

    if (!code || !name || !electionCenterId) {
      notify("يرجى إدخال جميع الحقول", "warning");
      setLoading(false);
      return;
    }

    try {
      const res = await dispatch(
        addStation({
          code,
          name,
          election_center_id: electionCenterId,
        })
      );

      if (res.type === "place/addStation/fulfilled") {
        notify("تمت إضافة المحطة بنجاح", "success");
        setCode("");
        setName("");
        setElectionCenterId("");
      } else {
        notify(res.payload?.message || "حدث خطأ أثناء الإضافة", "error");
      }
    } catch (err) {
      notify("فشل الإضافة", "error");
    }

    setLoading(false);
  };

  return [
    code,
    name,
    electionCenterId,
    loading,
    submitClicked,
    onChangeCode,
    onChangeName,
    onChangeElectionCenterId,
    onSubmit,
  ];
};

export default AddStationHook;
