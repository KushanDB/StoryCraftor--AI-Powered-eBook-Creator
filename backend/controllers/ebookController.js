import Ebook from '../models/Ebook.js';

// @desc    Create new eBook
// @route   POST /api/ebooks
// @access  Private
export const createEbook = async (req, res) => {
  try {
    const { title, description, genre } = req.body;

    const ebook = await Ebook.create({
      title,
      description,
      genre,
      author: req.user._id,
      chapters: [],
    });

    res.status(201).json(ebook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all user's eBooks
// @route   GET /api/ebooks
// @access  Private
export const getUserEbooks = async (req, res) => {
  try {
    const ebooks = await Ebook.find({ author: req.user._id }).sort({ createdAt: -1 });
    res.json(ebooks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single eBook
// @route   GET /api/ebooks/:id
// @access  Private
export const getEbookById = async (req, res) => {
  try {
    const ebook = await Ebook.findById(req.params.id);

    if (ebook && ebook.author.toString() === req.user._id.toString()) {
      res.json(ebook);
    } else {
      res.status(404).json({ message: 'eBook not found or unauthorized' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update eBook
// @route   PUT /api/ebooks/:id
// @access  Private
export const updateEbook = async (req, res) => {
  try {
    const ebook = await Ebook.findById(req.params.id);

    if (ebook && ebook.author.toString() === req.user._id.toString()) {
      ebook.title = req.body.title || ebook.title;
      ebook.description = req.body.description || ebook.description;
      ebook.genre = req.body.genre || ebook.genre;
      ebook.status = req.body.status || ebook.status;

      const updatedEbook = await ebook.save();
      res.json(updatedEbook);
    } else {
      res.status(404).json({ message: 'eBook not found or unauthorized' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete eBook
// @route   DELETE /api/ebooks/:id
// @access  Private
export const deleteEbook = async (req, res) => {
  try {
    const ebook = await Ebook.findById(req.params.id);

    if (ebook && ebook.author.toString() === req.user._id.toString()) {
      await Ebook.deleteOne({ _id: req.params.id });
      res.json({ message: 'eBook removed' });
    } else {
      res.status(404).json({ message: 'eBook not found or unauthorized' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add chapter to eBook
// @route   POST /api/ebooks/:id/chapters
// @access  Private
export const addChapter = async (req, res) => {
  try {
    const { title, content } = req.body;
    const ebook = await Ebook.findById(req.params.id);

    if (ebook && ebook.author.toString() === req.user._id.toString()) {
      const chapter = {
        title,
        content: content || '',
        order: ebook.chapters.length + 1,
      };

      ebook.chapters.push(chapter);
      await ebook.save();

      res.status(201).json(ebook);
    } else {
      res.status(404).json({ message: 'eBook not found or unauthorized' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update chapter
// @route   PUT /api/ebooks/:id/chapters/:chapterId
// @access  Private
export const updateChapter = async (req, res) => {
  try {
    const ebook = await Ebook.findById(req.params.id);

    if (ebook && ebook.author.toString() === req.user._id.toString()) {
      const chapter = ebook.chapters.id(req.params.chapterId);

      if (chapter) {
        chapter.title = req.body.title || chapter.title;
        chapter.content = req.body.content || chapter.content;

        await ebook.save();
        res.json(ebook);
      } else {
        res.status(404).json({ message: 'Chapter not found' });
      }
    } else {
      res.status(404).json({ message: 'eBook not found or unauthorized' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete chapter
// @route   DELETE /api/ebooks/:id/chapters/:chapterId
// @access  Private
export const deleteChapter = async (req, res) => {
  try {
    const ebook = await Ebook.findById(req.params.id);

    if (ebook && ebook.author.toString() === req.user._id.toString()) {
      ebook.chapters = ebook.chapters.filter(
        (chapter) => chapter._id.toString() !== req.params.chapterId
      );

      // Reorder chapters
      ebook.chapters.forEach((chapter, index) => {
        chapter.order = index + 1;
      });

      await ebook.save();
      res.json(ebook);
    } else {
      res.status(404).json({ message: 'eBook not found or unauthorized' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};