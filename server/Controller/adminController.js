const Request = require("../Models/requestSchema ");
const User = require("../Models/User");
const Donation = require("../Models/donationSchema ");


const updateRequestStatus = async (req, res) => {
  const { request_id, status } = req.body; 

  try {
    const updatedRequest = await Request.findOneAndUpdate(
      { request_id: request_id },
      { $set: { status: status } },
      { new: true } 
    );

    if (!updatedRequest) {
      return res.status(404).json({ success: false, message: 'The request could not be found' });
    }

    return res.status(200).json({ success: true, message: 'updated successfully', request: updatedRequest });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'An error occurred while updating the request', error: error.message });
  }
};


//_______________________________________________________________________________________________________



const softDeleteUser = async (req, res) => {
    const { email } = req.body;  //user_id
  
    try {
      const updatedUser = await User.findOneAndUpdate(
        { email: email },
        { $set: { is_deleted: true } },
        { new: true }
      );
  
      if (!updatedUser) {
        return res.status(404).json({ success: false, message: 'The user not found' });
      }
  
      return res.status(200).json({ success: true, message: 'Deleted successfully', user: updatedUser });
    } catch (error) {
      return res.status(500).json({ success: false, message: 'An error occurred while deleting the user', error: error.message });
    }
  };

//_______________________________________________________________________________________________________

const restoreUser = async (req, res) => {
    const { email } = req.body;
  
    try {
      const restoredUser = await User.findOneAndUpdate(
        { email: email },
        { $set: { is_deleted: false } },
        { new: true } 
      );
  
      if (!restoredUser) {
        return res.status(404).json({ success: false, message: 'The user not found' });
      }
  
      return res.status(200).json({ success: true, message: 'successfully restored', user: restoredUser });
    } catch (error) {
      return res.status(500).json({ success: false, message: 'An error occurred while restoring the user', error: error.message });
    }
  };

//_______________________________________________________________________________________________________


const viewAllDonations = async (req, res) => {
    try {
      const allDonations = await Donation.find();
  
      return res.status(200).json({ success: true, donations: allDonations });
    } catch (error) {
      return res.status(500).json({ success: false, message: 'An error occurred while searching for donation records', error: error.message });
    }
  };





  

module.exports = {
  updateRequestStatus,
  softDeleteUser,
  restoreUser,
  viewAllDonations
};
