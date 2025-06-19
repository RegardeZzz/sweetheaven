import React, { useState } from "react";

const PaymentModal = ({ isOpen, onClose, onSubmit }) => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [pin, setPin] = useState("");

  const handleCardNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 16); // только цифры, не больше 16
    const formattedValue = value.replace(/(.{4})/g, "$1 ").trim(); // группировка по 4 цифры
    setCardNumber(formattedValue);
  };


  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, "").slice(0, 4);

    if (value.length > 2) {
      value = `${value.slice(0, 2)}/${value.slice(2)}`;
    } else if (value.length === 2) {
      value = `${value}/`; // авто вставка "/"
    }

    setExpiry(value);
  };

  const handleSubmit = () => {
    const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;

    const rawCardNumber = cardNumber.replace(/\s/g, ""); // удаляем пробелы

    if (rawCardNumber.length !== 16 || pin.length !== 3 || !expiryRegex.test(expiry)) {
      alert("Введите корректные данные карты (16 цифр, 3-значный пин, срок: MM/YY)");
      return;
    }   

    onSubmit();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 shadow-lg w-80">
        <h2 className="text-xl font-semibold mb-4">Оплата</h2>
        <div className="space-y-3">
          <input
            type="text"
            maxLength="19"
            value={cardNumber}
            onChange={handleCardNumberChange}
            placeholder="Номер карты (16 цифр)"
            className="w-full border rounded px-3 py-2"
          />
          <input
            type="text"
            maxLength="5"
            placeholder="MM/YY"
            value={expiry}
            onChange={handleExpiryChange}
            className="w-full border rounded px-3 py-2"
          />
          <input
            type="password"
            maxLength="3"
            placeholder="ПИН-код (3 цифры)"
            value={pin}
            onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div className="flex justify-end mt-4 gap-2">
          <button onClick={onClose} className="px-4 py-2 rounded bg-gray-200">Отмена</button>
          <button onClick={handleSubmit} className="px-4 py-2 rounded bg-primary text-white">Оплатить</button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
