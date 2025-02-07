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
                $form = new FormComponent('form--test', 'test.php', []);
                /**
                 * form element debugging
                 */
                $ele = new FormElement();
                console($ele);
            ?>
        </section>
        <section>
            <form action="./src/upload.php" method="POST" enctype="multipart/form-data">
            <label id="choose-file" for="file" class="file--upload">
                Choose File
            </label>
            <input type="file" name="file"/>
            <button id="upload" type="submit">Upload</button>
            </form>
        </section>
    </main>
    <footer></footer>
  </body>
</html>