<?php
defined('_JEXEC') or die('Restricted access');

$app = JFactory::getApplication();
$menu = $app->getMenu()->getActive();
?>
<div id="clubs">
    <h1><?= $this->get('document')->title; ?></h1>
    <?php if ($menu->query['text_intro']): ?>
        <div id="desc-clubs">
            <?= $menu->query['text_intro'] ?>
        </div>
    <?php endif; ?>
    <?php if ($this->clubs): //print_r($this->clubs);?>
        <div id="club">
            <?php foreach ($this->categories as $categories): ?>
                <h2><i class="fas fa-plus-square"></i><?= $categories->categoria; ?></h2>
                <div>
                    <?php foreach (ClubsModelClubs::getClubs($categories->id) as $club): ?>
                        <div>
                            <h4><?= $club->name; ?></h4>
                        </div>

                    <?php endforeach; ?>
                </div>
            <?php endforeach; ?>
        </div>
    <?php endif; ?>

</div>

<script>
    jQuery(document).ready(function ($) {
        $("#club").accordion({
            collapsible: true,
            active: false,
            heightStyle: "content"
        });


        $('#club').each(function(){
            console.log($(this).find('h2').length);
        });
    });
</script>
  
   
