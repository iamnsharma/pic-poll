import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    margin: 0,
    justifyContent: 'flex-start',
    height: '100%',
    width: '70%',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10, // Adjust as needed
  },

  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10, // Adjust as needed
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  titleLogo: {
    fontFamily: 'Roboto-Regular',
    fontSize: 18,
    color: '#1877f2',
    fontWeight: '700',
    marginLeft: 5,
    textAlign: 'center',
    marginTop: 0,
  },
  headerOuter: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1877f2',
  },
  dropdownContainer: {
    flex: 1, // Make the dropdown container take up available space
    backgroundColor: '#fff',
  },
  profileImage: {
    width: 110,
    height: 110,
  },
  navigationViewContainer: {
    padding: 10,
  },
  navigationViewItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  navigationViewItemText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 18,
    color: '#000',
    fontWeight: '600',
    marginLeft: 5,
  },
});
