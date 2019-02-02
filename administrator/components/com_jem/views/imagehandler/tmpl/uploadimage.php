<?php
/**
 * @version 2.1.7
 * @package JEM
 * @copyright (C) 2013-2016 joomlaeventmanager.net
 * @copyright (C) 2005-2009 Christoph Lukes
 * @license http://www.gnu.org/licenses/gpl-2.0.html GNU/GPL
 */

defined('_JEXEC') or die;
?>

<form method="post" action="<?php echo htmlspecialchars($this->request_url); ?>" enctype="multipart/form-data" name="adminForm" id="adminForm">

<table class="noshow">
	<tr>
		<td width="50%" valign="top">

			<?php if($this->ftp): ?>
				<fieldset class="adminform">
					<legend><?php echo JText::_('COM_JEM_FTP_TITLE'); ?></legend>

					<?php echo JText::_('COM_JEM_FTP_DESC'); ?>

					<?php if(JError::isError($this->ftp)): ?>
						<p><?php echo JText::_($this->ftp->message); ?></p>
					<?php endif; ?>

					<table class="adminform nospace">
						<tbody>
							<tr>
								<td width="120">
									<label for="username"><?php echo JText::_('COM_JEM_USERNAME'); ?>:</label>
								</td>
								<td>
									<input type="text" id="username" name="username" class="input_box" size="70" value="" />
								</td>
							</tr>
							<tr>
								<td width="120">
									<label for="password"><?php echo JText::_('COM_JEM_PASSWORD'); ?>:</label>
								</td>
								<td>
									<input type="password" id="password" name="password" class="input_box" size="70" value="" />
								</td>
							</tr>
						</tbody>
					</table>
				</fieldset>
			<?php endif; ?>

			<fieldset class="adminform">
				<legend><?php echo JText::_('COM_JEM_SELECT_IMAGE_UPLOAD'); ?></legend>
				<table class="admintable">
					<tbody>
						<tr>
							<td>
								<input class="inputbox" name="userfile" id="userfile" type="file" />
								<br /><br />
								<input class="button" type="submit" value="<?php echo JText::_('COM_JEM_UPLOAD') ?>" name="adminForm" />
							</td>
						</tr>
					</tbody>
				</table>
			</fieldset>

		</td>
		<td width="50%" valign="top">

			<fieldset class="adminform">
				<legend><?php echo JText::_('COM_JEM_ATTENTION'); ?></legend>
				<table class="admintable">
					<tbody>
						<tr>
							<td>
								<b><?php echo JText::_('COM_JEM_TARGET_DIRECTORY').':'; ?></b>
								<?php
								if($this->task == 'venueimg') {
									echo "/images/jem/venues/";
									$this->task = 'imagehandler.venueimgup';
								} else if($this->task == 'eventimg') {
									echo "/images/jem/events/";
									$this->task = 'imagehandler.eventimgup';
								} else if($this->task == 'categoriesimg') {
									echo "/images/jem/categories/";
									$this->task = 'imagehandler.categoriesimgup';
								}
								?>
								<br />
								<b><?php echo JText::_('COM_JEM_IMAGE_FILESIZE').':'; ?></b> <?php echo $this->jemsettings->sizelimit; ?> kb<br />

								<?php
								if($this->jemsettings->gddisabled == 0 || (imagetypes() & IMG_PNG)) {
									echo "<br /><span style='color:green'>".JText::_('COM_JEM_PNG_SUPPORT')."</span>";
								} else {
									echo "<br /><span style='color:red'>".JText::_('COM_JEM_NO_PNG_SUPPORT')."</span>";
								}
								if($this->jemsettings->gddisabled == 0 || (imagetypes() & IMG_JPEG)) {
									echo "<br /><span style='color:green'>".JText::_('COM_JEM_JPG_SUPPORT')."</span>";
								} else {
									echo "<br /><span style='color:red'>".JText::_('COM_JEM_NO_JPG_SUPPORT')."</span>";
								}
								if($this->jemsettings->gddisabled == 0 || (imagetypes() & IMG_GIF)) {
									echo "<br /><span style='color:green'>".JText::_('COM_JEM_GIF_SUPPORT')."</span>";
								} else {
									echo "<br /><span style='color:red'>".JText::_('COM_JEM_NO_GIF_SUPPORT')."</span>";
								}
								?>
							</td>
						</tr>
					</tbody>
				</table>
			</fieldset>

		</td>
	</tr>
</table>

<?php if($this->jemsettings->gddisabled) { ?>

<table class="noshow">
	<tr>
		<td>

			<fieldset class="adminform">
				<legend><?php echo JText::_('COM_JEM_ATTENTION'); ?></legend>
				<table class="admintable">
					<tbody>
						<tr>
							<td class="center">
								<?php echo JText::_('COM_JEM_GD_WARNING'); ?>
							</td>
						</tr>
					</tbody>
				</table>
			</fieldset>

		</td>
	</tr>
</table>

<?php } ?>

<?php echo JHtml::_('form.token'); ?>
<input type="hidden" name="option" value="com_jem" />
<input type="hidden" name="task" value="<?php echo $this->task;?>" />
</form>

<p class="copyright">
	<?php echo JEMAdmin::footer(); ?>
</p>
