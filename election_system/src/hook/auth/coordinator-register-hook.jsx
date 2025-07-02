import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../../redux/authSlice";
import notify from "../useNotification";

const CoordinatorRegisterHook = () => {
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [grandFatherName, setGrandFatherName] = useState("");
  const [phone, setPhone] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [personalPhoto, setPersonalPhoto] = useState(null);
  const [personalPhotoPreview, setPersonalPhotoPreview] = useState(null);
  const [idPhoto, setIdPhoto] = useState(null);
  const [idPhotoPreview, setIdPhotoPreview] = useState(null);
  const [electionCardPhoto, setElectionCardPhoto] = useState(null);
  const [electionCardPhotoPreview, setElectionCardPhotoPreview] = useState(null);

  const [centers, setCenters] = useState([""]);

  const handleFileChange = (e, setFile, setPreview) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };
  

  const handleCenterChange = (index, value) => {
    const updated = [...centers];
    updated[index] = value;
    setCenters(updated);
  };

  const addCenter = () => {
    setCenters([...centers, ""]);
  };

  const removeCenter = (index) => {
    const updated = centers.filter((_, i) => i !== index);
    setCenters(updated);
  };

  const validationValues = () => {
    if (!firstName.trim()) return notify("الاسم الأول مطلوب", "error"), false;
    if (!fatherName.trim()) return notify("اسم الأب مطلوب", "error"), false;
    if (!grandFatherName.trim()) return notify("اسم الجد مطلوب", "error"), false;
    if (!phone.trim()) return notify("رقم الهاتف مطلوب", "error"), false;
    if (phone.length < 11) return notify("رقم الهاتف يجب أن يكون 11 رقم على الأقل", "error"), false;
    if (!birthYear.trim()) return notify("سنة الميلاد مطلوبة", "error"), false;
    if (!password.trim()) return notify("كلمة المرور مطلوبة", "error"), false;
    if (password.length < 6) return notify("كلمة المرور يجب أن تكون 6 أحرف على الأقل", "error"), false;
    if (password !== confirmPassword) return notify("كلمة المرور غير متطابقة", "error"), false;
    if (!personalPhoto) return notify("اختر الصورة الشخصية", "error"), false;
    if (!idPhoto) return notify("اختر صورة الهوية", "error"), false;
    if (!electionCardPhoto) return notify("اختر صورة بطاقة الانتخاب", "error"), false;
    if (centers.some(center => !center.trim())) return notify("يجب إدخال جميع أسماء المراكز", "error"), false;

    return true;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validationValues()) return;

    const formData = new FormData();
    formData.append("registrationType", "coordinator");
    formData.append("role", "coordinator");
    formData.append("first_name", firstName);
    formData.append("second_name", fatherName);
    formData.append("last_name", grandFatherName);
    formData.append("phone_number", phone);
    formData.append("birth_year", birthYear);
    formData.append("password", password);

    // ⬅ إضافة المراكز كمصفوفة JSON (حسب ما يقبله السيرفر)
    formData.append("election_centers", JSON.stringify(centers));

    if (personalPhoto) formData.append("profile_image", personalPhoto);
    if (idPhoto) formData.append("identity_image", idPhoto);
    if (electionCardPhoto) formData.append("voting_card_image", electionCardPhoto);

    try {
      const result = await dispatch(addUser(formData)).unwrap();
      if (result && result.data) {
        notify("تم التسجيل بنجاح", "success");

        // reset form
        setFirstName("");
        setFatherName("");
        setGrandFatherName("");
        setPhone("");
        setBirthYear("");
        setPassword("");
        setConfirmPassword("");
        setPersonalPhoto(null);
        setPersonalPhotoPreview(null);
        setIdPhoto(null);
        setIdPhotoPreview(null);
        setElectionCardPhoto(null);
        setElectionCardPhotoPreview(null);
        setCenters([""]);
      } else {
        throw new Error("لم يتم استلام رد من الخادم");
      }
    } catch (err) {
      if (err.errors && Array.isArray(err.errors)) {
        err.errors.forEach((e) => notify(e.msg, "error"));
      } else if (err.response && err.response.data) {
        notify(err.response.data.message || "حدث خطأ أثناء التسجيل", "error");
      } else {
        notify(err.message || "حدث خطأ في الاتصال بالخادم", "error");
      }
    }
  };

  return {
    firstName,
    handleFirstNameChange: (e) => setFirstName(e.target.value),
    fatherName,
    handleFatherNameChange: (e) => setFatherName(e.target.value),
    grandFatherName,
    handleGrandFatherNameChange: (e) => setGrandFatherName(e.target.value),
    phone,
    handlePhoneChange: (e) => setPhone(e.target.value),
    birthYear,
    handleBirthYearChange: (e) => setBirthYear(e.target.value),
    password,
    handlePasswordChange: (e) => setPassword(e.target.value),
    confirmPassword,
    handleConfirmPasswordChange: (e) => setConfirmPassword(e.target.value),
    personalPhoto,
    personalPhotoPreview,
    idPhoto,
    idPhotoPreview,
    electionCardPhoto,
    electionCardPhotoPreview,
    handleFileChange,
    setPersonalPhoto,
    setPersonalPhotoPreview,
    setIdPhoto,
    setIdPhotoPreview,
    setElectionCardPhoto,
    setElectionCardPhotoPreview,
    centers,
    handleCenterChange,
    addCenter,
    removeCenter,
    handleSubmit,
  };
};

export default CoordinatorRegisterHook;
