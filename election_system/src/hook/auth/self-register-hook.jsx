// src/hook/auth/register-hook.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../redux/authSlice";
import notify from "../useNotification";

const SelfRegisterHook = () => {
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [grandFatherName, setGrandFatherName] = useState("");
  const [phone, setPhone] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [electionCenter, setElectionCenter] = useState("");
  const [hasVotingRight, setHasVotingRight] = useState(false);
  const [idCardUpdated, setIdCardUpdated] = useState(false);

  const [personalPhoto, setPersonalPhoto] = useState(null);
  const [personalPhotoPreview, setPersonalPhotoPreview] = useState(null);
  const [idPhoto, setIdPhoto] = useState(null);
  const [idPhotoPreview, setIdPhotoPreview] = useState(null);
  const [electionCardPhoto, setElectionCardPhoto] = useState(null);
  const [electionCardPhotoPreview, setElectionCardPhotoPreview] =
    useState(null);

  // دوال تغيير الحالة
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

  const handleElectionCenterChange = (e) => {
    setElectionCenter(e.target.value);
  };

  const handleHasVotingRightChange = (e) => {
    setHasVotingRight(e.target.checked);
  };

  const handleIdCardUpdatedChange = (e) => {
    setIdCardUpdated(e.target.checked);
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

  const validationValues = () => {
    if (password === "") {
      notify("من فضلك ادخل كلمة السر", "error");
      return false;
    }

    if (phone.length <= 10) {
      notify("من فضلك ادخل رقم هاتف صحيح", "error");
      return false;
    }
    if (password !== confirmPassword) {
      notify("من فضلك تاكد من كلمه السر", "error");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validationValues()) return;

    const formData = new FormData();
    formData.append("first_name", firstName);
    formData.append("second_name", fatherName);
    formData.append("last_name", grandFatherName);
    formData.append("phone_number", phone);
    formData.append("birth_year", birthYear);
    formData.append("password", password);
    formData.append("can_vote", hasVotingRight);
    formData.append("has_updated_card", idCardUpdated);
    formData.append("election_center", electionCenter);
    formData.append("election_center", electionCenter);

    if (personalPhoto) formData.append("profile_image", personalPhoto);
    if (idPhoto) formData.append("identity_image", idPhoto);
    if (electionCardPhoto)
      formData.append("voting_card_image", electionCardPhoto);

    try {
      await dispatch(registerUser(formData)).unwrap();
      notify("تم التسجيل بنجاح", "success");
    } catch (err) {
      if (err.errors && Array.isArray(err.errors)) {
        err.errors.forEach((e) => notify(e.msg, "error"));
      } else {
        notify(err.message || "حدث خطأ أثناء التسجيل", "error");
      }
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
    electionCenter,
    handleElectionCenterChange,
    hasVotingRight,
    handleHasVotingRightChange,
    idCardUpdated,
    handleIdCardUpdatedChange,
    personalPhoto,
    handleFileChange,
    setPersonalPhoto,
    setPersonalPhotoPreview,
    personalPhotoPreview,
    idPhoto,
    idPhotoPreview,
    electionCardPhoto,
    electionCardPhotoPreview,
    handleSubmit,
    setIdPhoto,
    setIdPhotoPreview,
    setElectionCardPhoto,
    setElectionCardPhotoPreview,
  ];
};

export default SelfRegisterHook;
