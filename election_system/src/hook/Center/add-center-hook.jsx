import React, { useState } from "react";
import { useDispatch } from "react-redux";
import notify from "../useNotification";
import { addElectionCenter, getElectionCenters } from "../../redux/placeSlice"; // تأكد من أن الأكشن موجود هنا

const AddCenterHook = (onClose) => {
  const dispatch = useDispatch();

  const [center, setCenter] = useState("");
  const [code, setCode] = useState("");
  const [governorateId, setGovernorateId] = useState("");
  const [districtId, setDistrictId] = useState("");
  const [subdistrictId, setSubdistrictId] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitClicked, setSubmitClicked] = useState(false);

  const onChangeCenter = (e) => {
    setCenter(e.target.value);
  };
  const onChangeCode = (e) => setCode(e.target.value);
  const onChangeGovernorateId = (e) => {
    setGovernorateId(Number(e.target.value));
    // إعادة تعيين قيم القضاء والناحية عند تغيير المحافظة
    setDistrictId("");
    setSubdistrictId("");
  };
  
  const onChangeDistrictId = (e) => {
    setDistrictId(Number(e.target.value));
    // إعادة تعيين قيمة الناحية عند تغيير القضاء
    setSubdistrictId("");
  };
  
  const onChangeSubdistrictId = (e) => setSubdistrictId(Number(e.target.value));
  const onChangeLatitude = (e) => setLatitude(e.target.value);
  const onChangeLongitude = (e) => setLongitude(e.target.value);
  const onLocationSelect = (lat, lng) => {
    setLatitude(lat);
    setLongitude(lng);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitClicked(true);
    setLoading(true);

    if (!center || !code || !governorateId || !districtId || !subdistrictId) {
      notify("يرجى إدخال جميع الحقول", "warning");
      setLoading(false);
      return;
    }

    try {
      const centerData = {
        name: center,
        code,
        governorate_id: governorateId,
        district_id: districtId,
        subdistrict_id: subdistrictId,
      };
      
      // إضافة الموقع الجغرافي إذا تم تحديده
      if (latitude && longitude) {
        centerData.latitude = parseFloat(latitude);
        centerData.longitude = parseFloat(longitude);
      }
      
      const res = await dispatch(addElectionCenter(centerData));

      if (res.type === "place/addElectionCenter/fulfilled") {
        await dispatch(getElectionCenters());

        notify("تمت إضافة المركز الانتخابي بنجاح", "success");
        setCenter("");
        setCode("");
        setGovernorateId("");
        setDistrictId("");
        setSubdistrictId("");
        setLatitude("");
        setLongitude("");
        
        // إغلاق المودال بعد الإضافة الناجحة
        if (onClose) onClose();
      } else {
        notify(res.payload?.message || "حدث خطأ أثناء الإضافة", "error");
      }
    } catch (err) {
      notify("فشل الإضافة", "error");
    }

    setLoading(false);
  };

  return [
    center,
    code,
    governorateId,
    districtId,
    subdistrictId,
    latitude,
    longitude,
    loading,
    submitClicked,
    onChangeCenter,
    onChangeCode,
    onChangeGovernorateId,
    onChangeDistrictId,
    onChangeSubdistrictId,
    onChangeLatitude,
    onChangeLongitude,
    onLocationSelect,
    onSubmit,
  ];
};

export default AddCenterHook;
