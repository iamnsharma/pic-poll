import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Modal,
  ActivityIndicator,
} from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';
import {ImageSource} from '../../Constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  addPurchaseHistory,
  addWithdrawHistory,
  getPurchaseHistory,
  getWithdrawHistory,
} from '../../apis/api';

function Wallet(): React.JSX.Element {
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [isWithdrawModalVisible, setWithdrawModalVisible] = useState(false);
  const [userId, setUserId] = useState(null);
  const [amount, setAmount] = useState(null);
  const [purchaseHistory, setPurchaseHistory] = useState(null);
  const [withdrawHistory, setWithdrawHistory] = useState(null);
  const [upi, setUpi] = useState(null);
  const [loading, setLoading] = useState(false);

  console.log(upi, 'upi');

  console.log(
    purchaseHistory,
    withdrawHistory,
    'purchaseHistory and withdrawHistory',
  );

  AsyncStorage.getItem('userId').then(val => setUserId(val));

  const handleAddMoney = async () => {
    // Add logic to handle Razorpay payment
    const options = {
      key: 'rzp_test_Ymhw4qXBvpDW5G', // Replace with your Razorpay Key ID
      amount: 100000, // Amount in paisa (e.g., 1000 paisa = ₹10)
      currency: 'INR',
      name: 'Pic Poll',
      description: 'Add money to wallet',
      image: ImageSource.logo,
      order_id: '', // Generate a unique order ID on your server
      prefill: {
        email: 'picpoll@gmail.com', // User's email address
        name: 'Pic Poll', // User's name
        method: 'upi', //card|upi|wallet
      },
      theme: {color: '#1877f2'},
    };

    try {
      const data = await RazorpayCheckout.open(options);
      console.log('Payment success:', data);

      // Call addPurchaseHistory with async/await and handle its result
      const purchaseHistoryData = await addPurchaseHistory({
        customer_id: userId,
        amount: amount,
        transition: [{}],
      });

      console.log(purchaseHistoryData, 'purchaseHistory data here');

      // const getPurchasehistory = await getPurchaseHistory();
      // setPurchaseHistory(getPurchasehistory);

      // Add logic to update wallet balance or perform any other action
    } catch (error) {
      console.error('Payment failed:', error);
      // Add logic to handle the failure scenario
    }
  };

  const handleWithdraw = () => {
    setWithdrawModalVisible(true);
  };

  useEffect(() => {
    const getPurchaseHistoryData = async () => {
      try {
        setLoading(true);
        const data = await getPurchaseHistory();
        setPurchaseHistory(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const getWithdrawHistoryData = async () => {
      try {
        setLoading(true);
        const data = await getWithdrawHistory();
        setWithdrawHistory(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    getPurchaseHistoryData();
    getWithdrawHistoryData();
  }, []);

  const totalPurchaseHistoryAmount = purchaseHistory?.data?.newpurchase?.reduce(
    (total: any, purchase: any) => total + purchase.amount,
    0,
  );

  const totalWithdrawHistoryAmount = withdrawHistory?.data?.newpurchase?.reduce(
    (total: any, purchase: any) => total + purchase.amount,
    0,
  );

  console.log(
    totalPurchaseHistoryAmount,
    totalWithdrawHistoryAmount,
    'totalAmount',
  );

  // const handleContinueWithdraw = () => {
  //   // Add logic to handle withdrawal with the specified amount
  //   console.log('Withdraw Amount:', withdrawAmount);

  //   // Close the modal
  //   setWithdrawModalVisible(false);
  // };

  const handlePressContinue = async () => {
    try {
      setLoading(true);

      const data = await addWithdrawHistory({
        customer_id: userId,
        amount: withdrawAmount,
      });
      setAmount(data?.data?.withdraw?.amount);
      setWithdrawModalVisible(false);
      setLoading(false);
    } catch (error) {
      console.error('Error sending OTP:', error);
    }
  };

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" color="#0000ff" />}

      <View style={styles.containerOuter}>
        <View>
          <Text style={styles.totalAmountText}>Wallet Amount</Text>
          <Text style={styles.amountValue}>1000</Text>
        </View>

        {/* Top right corner - Add money button */}
        <TouchableOpacity
          style={styles.addMoneyButton}
          onPress={handleAddMoney}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>

        {/* Bottom - Withdraw money button */}
      </View>
      <View style={styles.withdrawMoneyButtonCon}>
        <TouchableOpacity
          style={styles.withdrawMoneyButton}
          onPress={handleWithdraw}>
          <Text style={styles.withdrawMoneyButtonText}>Withdraw</Text>
        </TouchableOpacity>
        <Text style={styles.withtext}>Minimum withdrawable amount is 200</Text>
      </View>

      <Text style={styles.totalAmount}>{`Total amount : ${
        totalPurchaseHistoryAmount - totalWithdrawHistoryAmount
      }`}</Text>

      {/* Withdraw Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isWithdrawModalVisible}
        onRequestClose={() => setWithdrawModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* Cross Icon */}
            <TouchableOpacity
              style={styles.closeIcon}
              onPress={() => setWithdrawModalVisible(false)}>
              <Ionicons name="close" size={24} color="#000" />
            </TouchableOpacity>

            {/* Modal Title */}
            <Text style={styles.modalTitle}>Amount</Text>

            {/* Withdraw Input */}
            <TextInput
              style={styles.withdrawInput}
              placeholder="Enter Amount"
              // keyboardType="numeric"
              value={withdrawAmount}
              onChangeText={setWithdrawAmount}
            />

            <TextInput
              style={styles.withdrawInput}
              placeholder="Enter UPI"
              // keyboardType="numeric"
              value={upi}
              onChangeText={text => setUpi(text)}
            />

            {/* Continue Button */}
            <TouchableOpacity
              disabled={withdrawAmount === '' || upi === ''}
              style={styles.continueButton}
              onPress={handlePressContinue}>
              <Text style={styles.continueButtonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  closeIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 10,
    zIndex: 1,
  },
  containerOuter: {
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 5,
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  totalAmountText: {
    fontSize: 22,
    color: '#000',
    fontWeight: '700',
  },
  amountValue: {
    fontSize: 20,
    color: '#000',
  },
  addMoneyButton: {
    position: 'absolute',
    top: 30,
    right: 10,
    padding: 10,
    backgroundColor: '#1877f2',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 50,
  },
  withdrawMoneyButton: {
    backgroundColor: '#1877f2',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 50,
  },
  withdrawMoneyButtonCon: {
    marginTop: 40,
    marginBottom: 30,
  },
  withdrawMoneyButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  withtext: {
    color: '#000',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
    color: '#000',
  },
  withdrawInput: {
    height: 50,
    fontSize: 18,
    textAlign: 'center',
    backgroundColor: '#fff',
    borderRadius: 6,
    elevation: 5,
    color: '#000',
    marginBottom: 20,
  },
  continueButton: {
    backgroundColor: '#1877f2',
    paddingVertical: 10,
    borderRadius: 50,
  },
  continueButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: '500',
    color: '#000',
  },
});

export default Wallet;
