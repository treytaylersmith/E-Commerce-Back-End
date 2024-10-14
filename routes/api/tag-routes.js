const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({
      include: [
        {
          model: Product,
          through: {
            model: ProductTag,
            attributes: [], // Exclude all attributes from the through model
          },
          as: "products",
          attributes: ["id", "product_name"],
        },
      ],
    });

    
    res.status(200).json(tagData);
  } catch(err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const tagData = await Tag.findOne({
      where: { id: req.params.id},
      include: [
        {
          model: Product,
          through: {
            model: ProductTag,
            attributes: [], // Exclude all attributes from the through model
          },
          as: "products",
          attributes: ["id", "product_name"],
        },
      ],
    });

    if(!tagData){
      res.status(404).json({message:"No Tag with that id"});
      return
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  // create a new tag
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagData = await Tag.update(
      {
        tag_name: req.body.tag_name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    

    if(!tagData){
      res.status(404).json({message:"No Tag with that id"});
      return
    }
    res.status(200).json({message: "Tag Updated Successfully"});
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if(!tagData){
      res.status(404).json({message:"No Tag with that id"});
      return
    }

    res.status(200).json({message:"Tag Deleted Successfully"});
  }catch(err) {
    res.status(500).json(err);}

});

module.exports = router;
