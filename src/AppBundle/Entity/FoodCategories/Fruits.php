<?php

namespace AppBundle\Entity\FoodCategories;

use Doctrine\ORM\Mapping as ORM;

/**
 * Fruits
 *
 * @ORM\Table(name="food_categories_fruits")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\FoodCategories\FruitsRepository")
 */
class Fruits extends FoodCategory
{
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;


    /**
     * Get id
     *
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }
}