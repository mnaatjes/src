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
      <h1>PHP: File Converter Test</h1>
    </header>
    <main id="root">
      <section>
        <?php
        /**
         * form component
         */
        $form = new FormComponent('', './src/upload.php', [
          new LabelElement('output', 'Select Type of Import'),
          new SelectElement('select--input', []),
          new FormElement('input', [
            'name'        => 'fileName',
            'type'        => 'text',
            'placeholder' => 'Enter a name to identify the file / data'
          ]),
          new FormElement('textarea', [
            'name'=>'desc',
            'placeholder'=>'Enter description of data here'
          ]),
          new LabelElement('output', 'Select Output Format'),
          new SelectElement('select--output', []),
          new LabelElement('', '', [
            'id'=>'file--button'
          ]),
          new FormElement('input', [
            'type'=>'file',
            'name'=>'file',
            'enctype'=>'multipart/form-data'
          ]),
          new HTMLComponent('div', ['id'=>'file--display'], [], ['textContent'=>'No File Selected']),
          new ButtonElement('btn--submit', 'Submit'),
          new ButtonElement('btn--reset', 'Reset', 'reset'),
        ], 'POST');
        $form->render();
        $form->mount();
        ?>
      </section>
      <section>
        <form action="./src/upload.php" method="POST" enctype="multipart/form-data">
        <input type="file" name="file">
        <input type="submit" value="Upload">
        </form>
      </section>
    </main>
    <footer></footer>
    <script type="module" src="./js/main.js"></script>
  </body>
</html>