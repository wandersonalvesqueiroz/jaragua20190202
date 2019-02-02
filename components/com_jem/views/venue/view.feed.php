<?php
/**
 * @version 2.2.3
 * @package JEM
 * @copyright (C) 2013-2017 joomlaeventmanager.net
 * @copyright (C) 2005-2009 Christoph Lukes
 * @license http://www.gnu.org/licenses/gpl-2.0.html GNU/GPL
 */
defined('_JEXEC') or die;


/**
 * Venue-Feed
 */
class JemViewVenue extends JViewLegacy
{
	/**
	 * Creates the Event Feed of the Venue
	 */
	public function display()
	{
		$app = JFactory::getApplication();
		$doc = JFactory::getDocument();
		$jemsettings = JemHelper::config();

		// Get some data from the model
		$app->input->set('limit', $app->getCfg('feed_limit'));

		$rows  = $this->get('Items');
		$venue = $this->get('Venue');

		// check for data error or missed access level
		if (empty($venue) || empty($venue->locauthorised)) {
			return;
		}

		if (!empty($rows)) {
			foreach ($rows as $row) {
				// strip html from feed item title
				$title = $this->escape($row->title);
				$title = html_entity_decode($title);

				// strip html from feed item category
				if (!empty($row->categories)) {
					$category = array();
					foreach ($row->categories AS $category2) {
						$category[] = $category2->catname;
					}

					// ading the , to the list when there are multiple category's
					$category = $this->escape(implode(', ', $category));
					$category = html_entity_decode($category);
				} else {
					$category = '';
				}

				//Format date and time
				$displaydate = JemOutput::formatLongDateTime($row->dates, $row->times,$row->enddates, $row->endtimes, $jemsettings->showtime);

				// url link to event
				$link = JRoute::_(JemHelperRoute::getEventRoute($row->id));

				// feed item description text
				$description  = JText::_('COM_JEM_TITLE').': '.$title.'<br />';
				$description .= JText::_('COM_JEM_VENUE').': '.$row->venue.($row->city ? (' / '.$row->city) : '').'<br />';
				$description .= JText::_('COM_JEM_CATEGORY').': '.$category.'<br />';
				$description .= JText::_('COM_JEM_DATE').': '.$displaydate.'<br />';
				$description .= JText::_('COM_JEM_DESCRIPTION').': '.$row->fulltext;

				$created = ($row->created ? date('r', strtotime($row->created)) : '');

				// load individual item creator class
				$item = new JFeedItem();
				$item->title       = $title;
				$item->link        = $link;
				$item->description = $description;
				$item->date        = $created;
				$item->category    = $category;

				// loads item info into rss array
				$doc->addItem($item);
			}
		}
	}
}
?>