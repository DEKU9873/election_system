import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../redux/authSlice";
import toast from "react-hot-toast";

// هوك لتعديل بيانات المستخدمين (مدير المركز، المراقب، الناخب)
const useEditUser = (userData, onClose, userRole) => {
    console.log('hook', userData);
  const dispatch = useDispatch();
  const { updateUserSuccess, updateUserError, isLoading } = useSelector(
    (state) => state.auth
  );

  // حالة البيانات الأساسية
  const [firstName, setFirstName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [grandFatherName, setGrandFatherName] = useState("");
  const [phone, setPhone] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newCenter, setNewCenter] = useState("");

  // حالة الصور
  const [personalPhoto, setPersonalPhoto] = useState(null);
  const [personalPhotoPreview, setPersonalPhotoPreview] = useState(null);
  const [idPhoto, setIdPhoto] = useState(null);
  const [idPhotoPreview, setIdPhotoPreview] = useState(null);
  const [electionCardPhoto, setElectionCardPhoto] = useState(null);
  const [electionCardPhotoPreview, setElectionCardPhotoPreview] = useState(null);

  // حالة خاصة بالناخبين
  const [hasVotingRight, setHasVotingRight] = useState(false);
  const [idUpdated, setIdUpdated] = useState(false);

  // تحميل بيانات المستخدم عند فتح المودل
  useEffect(() => {
    if (userData) {
      console.log('Setting initial data from userData:', userData);
      // استخدام setTimeout لضمان تنفيذ هذا الكود بعد الرندر الأولي
      setTimeout(() => {
        setFirstName(userData.first_name || "");
        setFatherName(userData.second_name || "");
        setGrandFatherName(userData.last_name || "");
        setPhone(userData.phone_number || "");
        setBirthYear(userData.birth_year || "");
        setNewCenter(userData.center?.id || "");
        
        // تعيين الحالات الخاصة بالناخبين إذا كانت موجودة
        if (userRole === "voter") {
          setHasVotingRight(userData.can_vote || false);
          setIdUpdated(userData.has_updated_card || false);
        }
        
        // تعيين معاينات الصور إذا كانت موجودة
        if (userData.profile_image) {
          setPersonalPhotoPreview(userData.profile_image);
        }
        if (userData.identity_image) {
          setIdPhotoPreview(userData.identity_image);
        }
        if (userData.voting_card_image && (userRole === "center_manager" || userRole === "observer")) {
          setElectionCardPhotoPreview(userData.voting_card_image);
        }
        console.log('Initial data set complete');
      }, 0);
    }
  }, [userData, userRole]);

  // التحقق من نجاح التحديث
  useEffect(() => {
    if (updateUserSuccess) {
      let successMessage = "تم تحديث بيانات المستخدم بنجاح";
      
      // تخصيص رسالة النجاح حسب نوع المستخدم
      if (userRole === "center_manager") {
        successMessage = "تم تحديث بيانات مدير المركز بنجاح";
      } else if (userRole === "observer") {
        successMessage = "تم تحديث بيانات المراقب بنجاح";
      } else if (userRole === "voter") {
        successMessage = "تم تحديث بيانات الناخب بنجاح";
      }
      
      toast.success(successMessage);
      onClose();
    }
    if (updateUserError) {
      toast.error(updateUserError);
    }
  }, [updateUserSuccess, updateUserError, onClose, userRole]);

  // معالجة تغيير الحقول
  const handleFirstNameChange = (e) => setFirstName(e.target.value);
  const handleFatherNameChange = (e) => setFatherName(e.target.value);
  const handleGrandFatherNameChange = (e) => setGrandFatherName(e.target.value);
  const handlePhoneChange = (e) => setPhone(e.target.value);
  const handleBirthYearChange = (e) => setBirthYear(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);
  const handleNewCenterChange = (e) => {
    console.log('New center value:', e.target.value);
    setNewCenter(e.target.value);
  };
  const handleHasVotingRightChange = (e) => setHasVotingRight(e.target.checked);
  const handleIdUpdatedChange = (e) => setIdUpdated(e.target.checked);

  // معالجة تغيير الملفات
  const handleFileChange = (e, photoType) => {
    const file = e.target.files[0];
    if (file) {
      if (photoType === "personalPhoto") {
        setPersonalPhoto(file);
        const reader = new FileReader();
        reader.onloadend = () => setPersonalPhotoPreview(reader.result);
        reader.readAsDataURL(file);
      } else if (photoType === "idPhoto") {
        setIdPhoto(file);
        const reader = new FileReader();
        reader.onloadend = () => setIdPhotoPreview(reader.result);
        reader.readAsDataURL(file);
      } else if (photoType === "electionCardPhoto") {
        setElectionCardPhoto(file);
        const reader = new FileReader();
        reader.onloadend = () => setElectionCardPhotoPreview(reader.result);
        reader.readAsDataURL(file);
      }
    }
  };

  // تقديم النموذج
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log('Submitting form with data:', {
      firstName,
      fatherName,
      grandFatherName,
      phone,
      birthYear,
      newCenter,
      userRole,
      hasVotingRight,
      idUpdated
    });
    
    // التحقق من تطابق كلمات المرور إذا تم إدخالها
    if (password && password !== confirmPassword) {
      toast.error("كلمات المرور غير متطابقة");
      return;
    }

    // إنشاء كائن FormData لإرسال البيانات والملفات
    const formData = new FormData();
    formData.append("first_name", firstName);
    formData.append("second_name", fatherName);
    formData.append("last_name", grandFatherName);
    formData.append("phone_number", phone);
    formData.append("birth_year", birthYear);
    
    // التأكد من أن قيمة مركز الانتخاب صالحة قبل إضافتها
    if (newCenter) {
      console.log('Adding center_id to form data:', newCenter);
      formData.append("center_id", newCenter);
    } else {
      console.log('No center_id to add, using original center if available');
      // إذا لم يتم اختيار مركز جديد، استخدم المركز الأصلي إذا كان متاحًا
      if (userData.center?.id) {
        formData.append("center_id", userData.center.id);
      }
    }
    
    formData.append("role", userRole);
    
    // إضافة الحقول الخاصة بالناخبين إذا كان المستخدم ناخباً
    if (userRole === "voter") {
      formData.append("can_vote", hasVotingRight);
      formData.append("has_updated_card", idUpdated);
    }
    
    // إضافة كلمة المرور إذا تم تغييرها
    if (password) {
      formData.append("password", password);
    }
    
    // إضافة الصور إذا تم تغييرها
    if (personalPhoto) {
      formData.append("profile_image", personalPhoto);
    }
    if (idPhoto) {
      formData.append("identity_image", idPhoto);
    }
    if (electionCardPhoto && (userRole === "center_manager" || userRole === "observer")) {
      formData.append("voting_card_image", electionCardPhoto);
    }
    
    // إرسال البيانات إلى الخادم
    dispatch(updateUser({ userId: userData.id, userData: formData }));
  };

  console.log(firstName, fatherName, grandFatherName, phone, birthYear);

  return [
    // البيانات الأساسية
    firstName,
    fatherName,
    grandFatherName,
    phone,
    birthYear,
    password,
    confirmPassword,
    newCenter,
    // الصور ومعايناتها
    personalPhoto,
    personalPhotoPreview,
    idPhoto,
    idPhotoPreview,
    electionCardPhoto,
    electionCardPhotoPreview,
    // الحالات الخاصة بالناخبين
    hasVotingRight,
    idUpdated,
    // معالجات الأحداث
    handleFirstNameChange,
    handleFatherNameChange,
    handleGrandFatherNameChange,
    handlePhoneChange,
    handleBirthYearChange,
    handlePasswordChange,
    handleConfirmPasswordChange,
    handleNewCenterChange,
    handleHasVotingRightChange,
    handleIdUpdatedChange,
    handleFileChange,
    handleSubmit,
    // حالة التحميل
    isLoading,
  ];
};

export default useEditUser;