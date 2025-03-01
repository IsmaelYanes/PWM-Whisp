# PWM-Whisp

Proyecto : Whisp
Autores: Wei Li, Eva Yuan Robaina, Ismael Pérez Yanes

Descripción:

Whisp es una aplicación centrada en la comunicación de usuarios, conocidos o no, mediante mensajes de voz y audios exclusivamente.
Podrás configurar tu perfil, conocer gente nueva, comunicarte con conocidos y escuchar audios que la gente a tu alcance publica.

Requisitos funcionales:
    - Enviar mensajes de voz a usuarios aleatorios.
    - Escuchar mensajes de voz de desconocidos.
    - Decidir si agregar o no una persona al contacto después de escuchar su mensaje.
    - Comunicación completamente anónima y sin uso de fotos o texto.
    - Cambiar la foto de perfil solamente con la combinación de los iconos predefinidos
    - Configurar la edad o sexo de receptor desconocido.
    - Interfaz sencilla y amigable.
    

Nombre y ubicacion del archivo pdf con los mockups y storyboard:
    

Listado de templates:

    Nombre : message
    Ubicación : PWM-Whisp/templates/message.html
    Descripción : Un cuadro de mensaje de voz que muestra foto de perfil.    

    Nombre : voiceMail
    Ubicación : PWM-Whisp/templates/VoiceMail.html
    Descripción : Un cuadro de mensaje de voz que muestra foto de perfil de emisor y junto con el botón de display.

    Nombre : toolbar
    Ubicación : PWM-Whisp/templates/toolbar.html
    Descripción : La barra de herramienta que contiene botton de ajuste, editar y otras funcionalidades.

    Nombre : photoCarousel
    Ubicación : PWM-Whisp/templates/photoCarousel.html
    Descripción : Un cuadro de imagenes, pendiente de adñadir la funcionalidad para que demuestre varias imagenes automáticas con js.

    Nombre : login
    Ubicación : PWM-Whisp/templates/login.html
    Descripción : Un cuadro que muestra la información general de de registro del usuario.

    Nombre : HomeHeader
    Ubicación : PWM-Whisp/templates/HomeHeader.html
    Descripción : El header de la página inicial con los botones de login y create account.

    Nombre : header
    Ubicación : PWM-Whisp/templates/header.html
    Descripción : El header de la página general.

    Nombre : fotter
    Ubicación : PWM-Whisp/templates/fotter.html
    Descripción : El footer de la página general.

    Nombre : editWindow
    Ubicación : PWM-Whisp/templates/editWindow.html
    Descripción : La ventana donde edita la foto de perfil.

    Nombre : createAccount
    Ubicación : PWM-Whisp/templates/createAccount.html
    Descripción : Un cuadro que contiene la información necesaria para crear la cuenta.

    Nombre : chatWindow
    Ubicación : PWM-Whisp/templates/chatWindow.html
    Descripción : La ventana que muestra historial de chat.

    Nombre : chatPanel
    Ubicación : PWM-Whisp/templates/chatPanel.html
    Descripción : La ventana que muestra los contactos.

    Nombre : bodyFrameWithMessage
    Ubicación : PWM-Whisp/templates/bodyFrameWithMessage.html
    Descripción : La ventana que muestra historial de chat y un marco predeninado para la venta.

Listado de páginas html del proyecto:
    Nombre : index
    Ubicación : PWM-Whisp/pages/index.html
    Descripción : La página inicial de la web.
    Templates usados : homeHeader, photoCarousel, fotter
    Mockup relacionado : 
    
    Nombre : registerPage
    Ubicación : PWM-Whisp/pages/registerPage.html
    Descripción : La página para registar el usuario.
    Templates usados : header, fotter, login.
    Mockup relacionado : 

    Nombre : createAccountPage
    Ubicación : PWM-Whisp/pages/createAccountPage.html
    Descripción : La página para crear la cuenta.
    Templates usados : header, fotter, createAccount.
    Mockup relacionado : 

    Nombre : chatPage
    Ubicación : PWM-Whisp/pages/chatPage.html
    Descripción : La página que muestra la historial de chat y lista de contacto.
    Templates usados : header, fotter, toolbar, bodyFrameWithMessage, message, chatWindow
    Mockup relacionado : 

    Nombre : editPage
    Ubicación : PWM-Whisp/pages/editPage.html
    Descripción : La página completa con la lista contacto y la interfaz de editar foto de perfil. 
    Templates usados : header, fotter, toolbar, bodyFrameWithMessage, message, editWindow.
    Mockup relacionado : 

    Nombre : userFrameRequestPage
    Ubicación : PWM-Whisp/pages/userFrameRequestPage.html
    Descripción : La página completa con la lista contacto y donde muestra mensajes recibidas para escuchar, posee botón de agregar usuario al contacto.
    Templates usados : header, fotter, toolbar, bodyFrameWithMessage, message, chatRequest, voiceMailRequest.
    Mockup relacionado : 

    Nombre : userFrameSendMessage
    Ubicación : PWM-Whisp/pages/userFrameSendMessage.html
    Descripción : La página donde el usuario inicia un mensaje de voz al desconocido.
    Templates usados : header, fotter, toolbar, bodyFrameWithMessage, message.
    Mockup relacionado : 

    Nombre : userFrameSettings
    Ubicación : PWM-Whisp/pages/userFrameSettings.html
    Descripción : La página donde el usuario configura su cuenta.
    Templates usados : header, fotter, toolbar, bodyFrameWithMessage, message.
    Mockup relacionado : 

Enlaces :
    figma : https://www.figma.com/design/HcQ9vCunbOPQVvvpc39OuU/PWM?node-id=0-1&m=dev&t=KvkWZwf1rN4dF1nq-1
    trello :   