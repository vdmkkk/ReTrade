import React, { useState, useRef, useEffect } from 'react';
import close from './img/close.svg'
import axios from 'axios';

const PreorderForm = ({ isOpen, onClose, option }) => {
const modalRef = useRef(null);

useEffect(() => {
const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
    onClose();
    }
};

if (isOpen) {
    document.addEventListener('mousedown', handleOutsideClick);
}

return () => {
    document.removeEventListener('mousedown', handleOutsideClick);
};
}, [isOpen, onClose]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [dropdownValue, setDropdownValue] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [flag, setFlag] = useState(false);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleDropdownChange = (e) => {
    setDropdownValue(e.target.value);
  };

  const handleModalClose = () => {
    setName('');
    setPhone('');
    setEmail('');
    setComment('');
    setDropdownValue('');
    onClose();
  };

  async function handleSubmit() {

    if (name == '' || phone == '') {
      setFlag(true)
      return;
    }

    const formData = {
      "recipient": "re.trade@bk.ru",
      "subject": "Обратная связь с клиентом",
      "text": `Клиент оформил предзаказ.\n${option === 1 ? "iPhone 15 Pro и 15 Pro Max" : "iPhone 15 и 15 Plus"}\n\nИмя: ${name}\nКонтактный номер телефона: ${phone}\n\nПожелания: ${comment}`,
    };

    onClose();

    try {
      const response = await axios.post('http://89.169.3.47:53314/api/send-email', formData);

      if (response.status === 200) {
        setStatusMessage('Email sent successfully!');
        console.log("success")
      }
    } catch (error) {
      setStatusMessage('Failed to send email. Please try again later.');
      console.error('Error sending email:', error);
      console.log('error')
    }

    

  }

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <div className='modal-close'>
            <img onClick={handleModalClose} src={close}/>
        </div>

        <h3>Имя *</h3>
        <input required={true} type="text" value={name} onChange={handleNameChange} />

        <h3>Контактный номер телефона *</h3>
        <input required={true} type="text" value={phone} onChange={handlePhoneChange} />

        <h3>Ваши пожелания</h3>
        <h4 style={{"fontSize": "12px", "color": "#8f8f8f", "paddingLeft": "3%"}}>Например, желаемый объем или цвет</h4>
        <textarea className='modal-comment' type="textarea" value={comment} onChange={handleCommentChange} />
        <h3 style={{"fontSize": "12px", "color": "#f00", "textAlign": "center", "display": flag ? "initial" : "none"}}>Все обязательные поля должны быть заполнены!</h3>
        <div onClick={() => handleSubmit()} className='modal-submit'>
            Отправить
        </div>
      </div>
    </div>
  );
};

export default PreorderForm;