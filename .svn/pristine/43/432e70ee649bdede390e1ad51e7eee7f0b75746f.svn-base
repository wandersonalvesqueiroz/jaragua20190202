<?php


defined('_JEXEC') or die('Restricted access');

jimport('joomla.application.component.view');


class ClubsViewClubs extends JViewLegacy
{

    protected $clubs;

    function display($tpl = null)
    {

        $this->clubs =      $this->get('Clubs');
        $this->categories = $this->get('CatClubs');

        $doc = JFactory::getDocument();
        $doc->addStyleSheet('components/com_clubs/css/style.css');
        parent::display($tpl);
    }

}