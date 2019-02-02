<div id="form-secretaria">
    <div class="form-secretaria">
        <?php if($params->get('text_intro')): ?>
            <div id="desc-secretaria">
            <?= $params->get('text_intro') ?>
            </div>
        <?php endif; ?>
        <div id="retornoHTML">
            <form id="acessar-secretaria" method="post" action="http://secretaria.jaraguaclub.com.br/associados/login" target="_blank">
                <fieldset>
                    <input type="text" name="data[Associado][cota]" class="inputCota" id="cota" placeholder="Cota" required><br>
                    <input type="password" name="data[Associado][senha]" id="senha" placeholder="Senha">
                    <input type="submit" id="btn" class="btn" value="<?= (!empty($enviar)) ? $enviar : 'Acessar'; ?>">
                </fieldset>
            </form>
        </div>
    </div>
</div>