<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>PHP: File Converter Test</title>
  <link rel="stylesheet" href="../../../styles/css/main.css">
</head>
  <?php
  /**
   *  Require Utils
   *  Enable error reporting
   */
  require_once '../../utils/utils-main.php';
  enableErrors();
  /**
   *  Require Components
   */
  require_once '../../components/components.php';
  ?>
  <body>
    <header>
    </header>
    <main id="root">
      <section>
        <h2>Supported Files</h2>
        <article class="file-upload">
          <img src="./assets/icon_json.svg" alt="">
          <img src="./assets/icon_csv.svg" alt="">
        </article>
      </section>
      <section>
        <h2>File Upload</h2>
        <?php
          $upload = new FormComponent('testForm', './src/upload.php', [
            new FormElement('input', [
              'name'        => 'refName',
              'type'        => 'text',
              'placeholder' => 'Enter a name to identify the file / data',
              'value'       => ''
            ]),
            new FormElement('input', [
              'type'=>'file',
              'name'=>'file',
              'enctype'=>'multipart/form-data'
            ]),
            new LabelElement('', '', [
              'id'=>'file--button',
              'name'=>'fileButton'
            ]),
            new HTMLComponent('div', ['id'=>'file--display'], [], ['textContent'=>'No File Selected']),
            new ButtonElement('btn--submit', 'Convert'),
          ], 'POST', ['enctype'=>'multipart/form-data']);
          $upload->render();
          $upload->mount();
        ?>
      </section>
    </main>
    <footer></footer>
    <script type="module" src="./js/upload.js"></script>
  </body>
</html>