import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser, getAllUsers } from "../../redux/authSlice";
import notify from "../useNotification";

const CoordinatorRegisterHook = (onClose) => {
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
  const [selectedCenters, setSelectedCenters] = useState([]);

  const handleFirstNameChange = (e) => setFirstName(e.target.value);
  const handleFatherNameChange = (e) => setFatherName(e.target.value);
  const handleGrandFatherNameChange = (e) => setGrandFatherName(e.target.value);
  const handlePhoneChange = (e) => setPhone(e.target.value);
  const handleBirthYearChange = (e) => setBirthYear(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);
  const handleSelectedCentersChange = (centers) => setSelectedCenters(centers);

  const handleFileChange = (e, setFile, setPreview) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      notify("كلمة المرور غير متطابقة", "error");
      return;
    }

    if (!personalPhoto || !idPhoto || !electionCardPhoto) {
      notify("يرجى رفع جميع الصور المطلوبة", "error");
      return;
    }

    if (selectedCenters.length === 0) {
      notify("يرجى اختيار مركز انتخابي واحد على الأقل", "error");
      return;
    }

    const formData = new FormData();
    formData.append("first_name", firstName);
    formData.append("second_name", fatherName);
    formData.append("last_name", grandFatherName);
    formData.append("phone_number", phone);
    formData.append("birth_year", birthYear);
    formData.append("password", password);
    formData.append("role", "coordinator");
    formData.append("profile_image", personalPhoto);
    formData.append("identity_image", idPhoto);
    formData.append("voting_card_image", electionCardPhoto);
    selectedCenters.forEach(center => {
      formData.append("election_centers_id[]", center.value);
    });

    try {
      const response = await dispatch(addUser(formData)).unwrap();
      notify("تم التسجيل بنجاح", "success");
      await dispatch(getAllUsers());
      
      // إغلاق المودال بعد التسجيل الناجح
      if (typeof onClose === 'function') {
        onClose();
      }
    } catch (error) {
      notify(error.message || "حدث خطأ أثناء التسجيل", "error");
    }
  };

  return [
    firstName,
    handleFirstNameChange,
    fatherName,
    handleFatherNameChange,
    grandFatherName,
    handleGrandFatherNameChange,
    phone,
    handlePhoneChange,
    birthYear,
    handleBirthYearChange,
    password,
    handlePasswordChange,
    confirmPassword,
    handleConfirmPasswordChange,
    personalPhoto,
    personalPhotoPreview,
    handleFileChange,
    idPhoto,
    idPhotoPreview,
    electionCardPhoto,
    electionCardPhotoPreview,
    selectedCenters,
    handleSelectedCentersChange,
    handleSubmit,
    setPersonalPhoto,
    setPersonalPhotoPreview,
    setIdPhoto,
    setIdPhotoPreview,
    setElectionCardPhoto,
    setElectionCardPhotoPreview
  ];
};

export default CoordinatorRegisterHook;
