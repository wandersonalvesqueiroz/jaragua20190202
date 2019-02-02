<?php
/**
 * @package     Joomla.Administrator
 * @subpackage  com_clubs
 *
 * @copyright   Copyright (C) 2005 - 2014 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

defined('_JEXEC') or die;

jimport('joomla.application.component.controller');

class ClubsController extends JControllerLegacy
{
    protected $default_view = 'clubs';
    
    public function display($cachable = false, $urlparams = false)
    {
    
        require_once JPATH_COMPONENT.'/helpers/clubs.php';
        
        ClubsHelper::addSubmenu(JRequest::getCmd('view','clubs'));
        
        $view = JRequest::getCmd('view', 'clubs');
        $layout = JRequest::getCmd('layout', 'default');
        $view = JRequest::getCmd('id');
        
        parent::display();
        
        return $this;

    }
}
