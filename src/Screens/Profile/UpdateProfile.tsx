import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/Feather';
import {Dialog, Portal, PaperProvider} from 'react-native-paper';
import DocumentPicker from 'react-native-document-picker';
import {ImageSource} from '../../Constants';

function UpdateProfile(): JSX.Element {
  const [chooseMediaDialogVisible, setChooseMediaDialogVisible] =
    useState<boolean>(false);

  const [displayName, setDisplayName] = useState();
  const [MobileNo, setMobileNo] = useState();

  const handleImagePicker = async () => {
    try {
      setChooseMediaDialogVisible(false);
      let imageRes = await ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: true,
      }).then(image => {
        // setAvatar(image.path);
        return image.path;
      });
    } catch (error) {
      console.log('ImagePicker Error: ', error);
    }
  };

  const pickDocument = async () => {
    try {
      setChooseMediaDialogVisible(false);
      const imageRes = await ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
      }).then(image => {
        return image.path;
      });
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        setChooseMediaDialogVisible(false);
        // User cancelled the picker
      } else {
        console.error('Error picking document: ', err);
      }
    }
  };

  const onRemoveAvatar = async () => {
    setChooseMediaDialogVisible(false);
  };
  return (
    <PaperProvider>
      <ScrollView>
        <View style={styles.container}>
          <View style={{justifyContent: 'center', flexDirection: 'row'}}>
            <View style={{position: 'relative'}}>
              <Image
                source={ImageSource.boy}
                style={{
                  width: 70,
                  height: 70,
                  borderRadius: 50,
                  borderColor: '#e1e1e1',
                  borderWidth: 1,
                }}
              />
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  top: 36,
                  left: 44,
                  backgroundColor: '#1877f2',
                  borderRadius: 15,
                  padding: 5,
                }}
                onPress={() => {
                  setChooseMediaDialogVisible(true);
                }}>
                <Icon name={'edit-2'} size={16} color={'white'} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Display Name</Text>
            <TextInput
              style={styles.input}
              value={displayName}
              onChangeText={text => setDisplayName(text)}
              placeholder="Enter your name"
              placeholderTextColor="#000"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Mobile No</Text>
            <TextInput
              style={styles.input}
              value={MobileNo}
              onChangeText={text => setMobileNo(text)}
              placeholder="Enter your mobile no"
              placeholderTextColor="#000"
            />
          </View>
          <View style={styles.pageDivider} />
          <TouchableOpacity style={styles.saveChangesButton}>
            <Text style={styles.saveChangesButtonText}>Save Changes</Text>
          </TouchableOpacity>
        </View>
        <Portal>
          <Dialog
            visible={chooseMediaDialogVisible}
            onDismiss={() => setChooseMediaDialogVisible(false)}
            style={{backgroundColor: '#fff'}}>
            <Dialog.Title
              style={{fontSize: 16, fontWeight: '800', color: '#000'}}>
              Edit Avatar
            </Dialog.Title>
            <Dialog.Content
              style={{flexDirection: 'column', gap: 25, marginTop: 10}}>
              <TouchableOpacity onPress={handleImagePicker}>
                <Text style={{fontSize: 16}}>Camera</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={pickDocument}>
                <Text style={{fontSize: 16}}>Media File</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onRemoveAvatar}>
                <Text style={{fontSize: 16}}>Remove Avatar</Text>
              </TouchableOpacity>
            </Dialog.Content>
            <Dialog.Actions>
              <TouchableOpacity
                onPress={() => setChooseMediaDialogVisible(false)}>
                <Text style={{color: '#1877f2'}}>Close</Text>
              </TouchableOpacity>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </ScrollView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    backgroundColor: '#1877f2',
    padding: 14,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'left',
    fontFamily: 'Roboto-Regular',
  },
  notice: {
    borderColor: '#0047ab',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 30,
    backgroundColor: '#dae2ee',
    borderStyle: 'dashed',
    fontFamily: 'Roboto-Regular',
  },
  noticeTag: {
    fontWeight: 'bold',
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
  },
  noticeText: {
    color: '#0f56ba',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 20,
    fontFamily: 'Roboto-Regular',
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputContainer2: {
    marginBottom: 16,
    marginTop: 16,
    textAlign: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  label: {
    marginBottom: 5,
    color: '#000',
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
  },
  labelChangePass: {
    marginBottom: 5,
    color: '#0047ab',
    fontSize: 15,
    fontFamily: 'Roboto-Regular',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 5,
    paddingLeft: 10,
    height: 40,
    fontSize: 16,
    backgroundColor: '#eee',
    fontFamily: 'Roboto-Regular',
    color: '#000',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#eee',
    height: 40,
    justifyContent: 'center',
  },
  picker: {
    height: 40,
    fontSize: 12,
    fontFamily: 'Roboto-Regular',
    color: '#8f8f8f',
  },
  pickerItem: {
    fontSize: 12,
  },
  pageDivider: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginVertical: 20,
  },
  saveChangesButton: {
    backgroundColor: '#1877f2',
    padding: 10,
    borderRadius: 50,
    alignItems: 'center',
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  saveChangesButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 17,
    fontFamily: 'Roboto-Regular',
    marginLeft: 10,
  },
  deleteAccountSection: {
    marginTop: 20,
  },
  deleteAccountTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
    fontFamily: 'Roboto-Regular',
  },
  deleteAccountDescription: {
    fontSize: 14,
    color: 'black',
    marginBottom: 10,
    fontFamily: 'Roboto-Regular',
  },
  deleteAccountButton: {
    backgroundColor: '#cb0808',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 20,
  },
  deleteAccountButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
  },
  imagePickerButton: {
    backgroundColor: '#eee',
    padding: 2,
    width: 100,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 0,
    borderWidth: 1,
    borderColor: '#000',
    fontFamily: 'Roboto-Regular',
  },
  imagePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  avatarImage: {
    width: 40,
    height: 40,
    borderRadius: 25,
  },
  imagePickerButtonText: {
    color: '#000',
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
  },
  path: {
    marginLeft: 5,
    color: '#8f8f8f',
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
  },
});
export default UpdateProfile;
