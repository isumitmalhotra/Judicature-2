const Case = require('../models/Case');

exports.createCase = async (req, res) => {
  try {
    const { title, description, lawyer, urgency } = req.body;
    const newCase = new Case({
      title,
      description,
      client: req.user.id,
      lawyer,
      urgency,
    });
    await newCase.save();
    res.status(201).json(newCase);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getCases = async (req, res) => {
  try {
    const cases = await Case.find().populate('client lawyer', 'name email role');
    res.json(cases);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getCaseById = async (req, res) => {
  try {
    const caseItem = await Case.findById(req.params.id).populate('client lawyer', 'name email role');
    if (!caseItem) return res.status(404).json({ message: 'Case not found' });
    res.json(caseItem);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateCase = async (req, res) => {
  try {
    const updated = await Case.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Case not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteCase = async (req, res) => {
  try {
    const deleted = await Case.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Case not found' });
    res.json({ message: 'Case deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
}; 