<?php
/**
 * @package		Joomla.Site
 * @subpackage	mod_representadas
 * @copyright	Copyright (C) 2005 - 2014 Open Source Matters, Inc. All rights reserved.
 * @license		GNU General Public License version 2 or later; see LICENSE.txt
 */

// no direct access
defined('_JEXEC') or die;

// Include the syndicate functions only once
require_once dirname(__FILE__).'/helper.php';
$document = JFactory::getDocument();
$document->addStyleSheet(JURI::base(true) . '/modules/mod_form_secretaria/assets/css/style.css');
$document->addScript(JURI::base(true) . '/modules/mod_form_secretaria/assets/js/jquery.maskedinput.min.js');
$document->addScript(JURI::base(true) . '/modules/mod_form_secretaria/assets/js/scripts.js');

$enviar = $params->get('button_enviar');

require JModuleHelper::getLayoutPath('mod_form_secretaria', $params->get('layout', 'default'));

