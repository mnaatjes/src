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
        $form = new FormComponent('form--test', '/test.php', [
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
          new SelectElement('output', [
            ['value'=>'csv', 'textContent'=>'Comma Separated Values'],
            ['value'=>'json', 'textContent'=>'Javascript Object Notation'],
            ['value'=>'xml', 'textContent'=>'Extensible Markup Language'],
            ['value'=>'sql', 'textContent'=>'Structured Query Language'],
          ]),
          new ButtonElement('submit', 'Submit'),
          new ButtonElement('reset', 'Reset', 'reset'),
        ], 'GET');
        $form->render();
        $form->mount();
        ?>
      </section>
      <section>
        <form action="./src/upload.php" method="POST" enctype="multipart/form-data">
          <label class="label__file-upload" for="">
          <i class="fa fa-cloud-upload"></i>
          </label>
          <input type="file" name="file" />
        </form>
      </section>
    </main>
    <footer></footer>
  </body>

</html>