import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser, getAllUsers } from "../../redux/authSlice";
import notify from "../useNotification";

const RegisterHook = (onClose) => {
  const dispatch = useDispatch();
  const [registrationType, setRegistrationType] = useState("voter");
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
  const [electionCardPhotoPreview, setElectionCardPhotoPreview] =
    useState(null);

  const [newCenter, setNewCenter] = useState("");
  const [added_by, setAddedBy] = useState("");
  const [station_id, setStationId] = useState("");
  const [address, setAddress] = useState("");
  const [voting_card_number, setVotingCardNumber] = useState("");

  const [hasVotingRight, setHasVotingRight] = useState(false);
  const [idUpdated, setIdUpdated] = useState(false);

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleFatherNameChange = (e) => {
    setFatherName(e.target.value);
  };

  const handleGrandFatherNameChange = (e) => {
    setGrandFatherName(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleBirthYearChange = (e) => {
    setBirthYear(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleRegistrationTypeChange = (type) => {
    setRegistrationType(type);
  };



  const handleAddByChange = (e) => {
    setAddedBy(Number(e.target.value));
  };

  const handleStationIdChange = (e) => {
    setStationId(Number(e.target.value));
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleVotingCardNumberChange = (e) => {
    setVotingCardNumber(e.target.value);
  };

  const handleFileChange = (e, setFile, setPreview) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleHasVotingRightChange = (e) => {
    setHasVotingRight(e.target.checked);
  };

  const handleIdUpdatedChange = (e) => {
    setIdUpdated(e.target.checked);
  };

  const handleNewCenterChange = (e) => {
    setNewCenter(Number(e.target.value));
  };

  const { user, error } = useSelector((state) => state.auth);
  console.log("user", user);
  console.log("error", error);

  const validationValues = () => {
    if (!firstName.trim()) {
      notify("من فضلك ادخل الاسم الأول", "error");
      return false;
    }

    if (!fatherName.trim()) {
      notify("من فضلك ادخل اسم الأب", "error");
      return false;
    }

    if (!grandFatherName.trim()) {
      notify("من فضلك ادخل اسم الجد", "error");
      return false;
    }

    if (!phone.trim()) {
      notify("من فضلك ادخل رقم الهاتف", "error");
      return false;
    }

    if (phone.length < 11) {
      notify("رقم الهاتف يجب أن يكون 11 رقم على الأقل", "error");
      return false;
    }

    if (!birthYear) {
      notify("من فضلك ادخل سنة الميلاد", "error");
      return false;
    }

    if (!password) {
      notify("من فضلك ادخل كلمة المرور", "error");
      return false;
    }

    if (password.length < 6) {
      notify("كلمة المرور يجب أن تكون 6 أحرف على الأقل", "error");
      return false;
    }

    if (password !== confirmPassword) {
      notify("كلمة المرور غير متطابقة", "error");
      return false;
    }

    if (!personalPhoto) {
      notify("من فضلك اختر الصورة الشخصية", "error");
      return false;
    }

    if (!idPhoto) {
      notify("من فضلك اختر صورة الهوية", "error");
      return false;
    }

    if (
      (registrationType === "observer" ||
        registrationType === "center_manager") &&
      !electionCardPhoto
    ) {
      notify("من فضلك اختر صورة بطاقة الانتخاب", "error");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validationValues()) return;

    const formData = new FormData();
    formData.append("registrationType", registrationType);
    formData.append(
      "role",
      registrationType === "observer"
        ? "observer"
        : registrationType === "voter"
        ? "voter"
        : registrationType === "center_manager"
        ? "center_manager"
        : "coordinator"
    );
    formData.append("first_name", firstName);
    formData.append("second_name", fatherName);
    formData.append("last_name", grandFatherName);
    formData.append("phone_number", phone);
    formData.append("birth_year", birthYear);
    formData.append("password", password);
    formData.append("can_vote", hasVotingRight);
    formData.append("has_updated_card", idUpdated);



    formData.append("added_by", added_by);
    formData.append("station_id", station_id);
    formData.append("address", address);
    formData.append("voting_card_number", voting_card_number);


    formData.append("election_center_id", newCenter);

    if (personalPhoto) formData.append("profile_image", personalPhoto);
    if (idPhoto) formData.append("identity_image", idPhoto);
    if (electionCardPhoto)
      formData.append("voting_card_image", electionCardPhoto);

    try {
      const result = await dispatch(addUser(formData)).unwrap();

      if (result && result.data) {
        await dispatch(getAllUsers());
        notify("تم اضافة ناخب بنجاح", "success");
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
        setNewCenter("");
        setHasVotingRight(false);
        setIdUpdated(false);

        // إغلاق المودال بعد التسجيل الناجح
        if (typeof onClose === "function") {
          onClose();
        }
      } else {
        throw new Error("لم يتم استلام رد من الخادم");
      }
    } catch (err) {
      if (error && error.message) {
        notify(error.message, "error");
      } else {
        notify(err.message || "حدث خطأ في الاتصال بالخادم", "error");
      }
    }
  };

  return {
    registrationType,
    handleRegistrationTypeChange,
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
    newCenter,
    handleNewCenterChange,
    hasVotingRight,
    handleHasVotingRightChange,
    idUpdated,
    handleIdUpdatedChange,
    handleSubmit,
    setPersonalPhoto,
    setPersonalPhotoPreview,
    setIdPhoto,
    setIdPhotoPreview,
    setElectionCardPhoto,
    setElectionCardPhotoPreview,
    added_by,
    station_id,
    address,
    voting_card_number,
    handleAddByChange,
    handleStationIdChange,
    handleAddressChange,
    handleVotingCardNumberChange,
  };
};

export default RegisterHook;
