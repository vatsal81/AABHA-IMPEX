const Certificate = require('../models/Certificate');

exports.getCertificates = async (req, res) => {
  try {
    const certs = await Certificate.find();
    res.json(certs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createCertificate = async (req, res) => {
  const cert = new Certificate(req.body);
  try {
    const newCert = await cert.save();
    res.status(201).json(newCert);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateCertificate = async (req, res) => {
  try {
    const updatedCert = await Certificate.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCert) return res.status(404).json({ message: 'Certificate not found' });
    res.json(updatedCert);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteCertificate = async (req, res) => {
  try {
    await Certificate.findByIdAndDelete(req.params.id);
    res.json({ message: 'Certificate deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
