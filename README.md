# Real-Time Chat Application

Bu proje, NestJS, MongoDB ve WebSockets (Socket.IO) kullanılarak geliştirilmiş gerçek zamanlı bir sohbet uygulamasıdır. Kullanıcılar ve sohbet odaları için REST API'ler, anlık mesajlaşma için ise bir WebSocket arayüzü içerir.

## Özellikler

- **Kullanıcı Yönetimi**: Yeni kullanıcı oluşturma, listeleme ve detaylarını görme.
- **Sohbet Odası Yönetimi**: Yeni sohbet odası oluşturma ve oda bilgilerini getirme.
- **Gerçek Zamanlı Mesajlaşma**: Socket.IO aracılığıyla odalarda anlık mesajlaşma.
- **Veri Kalıcılığı**: Tüm kullanıcı, oda ve mesaj verileri MongoDB'de saklanır.
- **İlişkisel Veri Yapısı**: Kullanıcılar ve sohbet odaları arasında ilişkiler kurulmuştur.
- **Yapılandırılmış Mimari**: Proje, NestJS'in modüler yapısına uygun olarak `Users`, `Chat`, ve `ChatRoom` modüllerine ayrılmıştır.

## Kullanılan Teknolojiler

- **Backend**: [NestJS](https://nestjs.com/)
- **Veritabanı**: [MongoDB](https://www.mongodb.com/) (Mongoose ile)
- **Gerçek Zamanlı İletişim**: [Socket.IO](https://socket.io/)
- **Dil**: [TypeScript](https://www.typescriptlang.org/)

## Kurulum ve Başlatma

Projeyi yerel makinenizde çalıştırmak için aşağıdaki adımları izleyin.

### Gereksinimler

- [Node.js](https://nodejs.org/en/) (v18 veya üstü)
- `npm` veya `yarn` paket yöneticisi
- Çalışan bir [MongoDB](https://www.mongodb.com/try/download/community) veritabanı

### Adımlar

1.  **Projeyi Klonlayın:**

    ```bash
    git clone <repository-url>
    cd real-time-chat
    ```

2.  **Bağımlılıkları Yükleyin:**

    ```bash
    npm install
    ```

3.  **Veritabanı Bağlantısı:**
    `src/app.module.ts` dosyasındaki MongoDB bağlantı adresini kendi adresinizle güncelleyin.

    ```typescript
    // src/app.module.ts
    MongooseModule.forRoot('mongodb://localhost:27017/realTimeChat'),
    ```

    Production ortamları için bu bilgiyi bir `.env` dosyasında saklamanız önerilir.

4.  **Uygulamayı Çalıştırın:**
    ```bash
    # Geliştirme modunda çalıştırmak için (hot-reload ile):
    npm run start:dev
    ```
    Uygulama varsayılan olarak `http://localhost:3000` adresinde çalışmaya başlayacaktır.

## API Endpoints

Uygulama, kullanıcı ve sohbet odası yönetimi için aşağıdaki REST API endpoint'lerini içerir.

### Kullanıcılar (`/users`)

- **`POST /users`**: Yeni bir kullanıcı oluşturur.
  - **Body**: `{ "username": "kullanici_adi" }`

- **`GET /users`**: Tüm kullanıcıları listeler.

- **`GET /users/:id`**: Belirtilen ID'ye sahip kullanıcıyı, katıldığı sohbet odalarıyla birlikte getirir.

### Sohbet Odaları (`/chat-room`)

- **`POST /chat-room`**: Yeni bir sohbet odası oluşturur.
  - **Body**: `{ "name": "Oda Adı", "createdBy": "kullanici_id" }`

- **`GET /chat-room/:id/messages`**: Belirtilen sohbet odasının mesajlarını, gönderen kullanıcı bilgileriyle birlikte getirir.

## WebSocket API

Gerçek zamanlı mesajlaşma için Socket.IO kullanılır.

- **Bağlantı Adresi**: `http://localhost:3000`

### Gönderilecek Olaylar (Client → Server)

- **`message`**: Bir sohbet odasına yeni bir mesaj gönderir.
  - **Payload**: `{ "message": "Mesaj içeriği", "chatRoomName": "Oda Adı", "senderId": "gonderen_kullanici_id" }`

- **`joinRoom`**: Bir kullanıcıyı belirli bir sohbet odasına dahil eder. (Bu özellik henüz eklenmemiştir, gateway'e eklenebilir.)
  - **Örnek Payload**: `{ "roomId": "oda_id", "userId": "kullanici_id" }`

### Dinlenecek Olaylar (Server → Client)

- **`message`**: Bir odaya yeni bir mesaj geldiğinde tüm istemcilere yayınlanır.
  - **Payload**: `{ "message": { "content": "...", "sender": {...} }, "clientId": "...", "timestamp": "..." }`

- **`error`**: Bir işlem sırasında hata oluştuğunda tetiklenir.
  - **Payload**: `{ "message": "Hata açıklaması" }`

## Örnek İstemci Kodu (JavaScript)

Basit bir HTML/JS istemcisi ile uygulamayı test edebilirsiniz.

```html
<script src="https://cdn.socket.io/4.7.5/socket.io.min.js"></script>
<script>
  const socket = io('http://localhost:3000');

  socket.on('connect', () => {
    console.log('Sunucuya bağlanıldı! ID:', socket.id);

    // Bir odaya mesaj gönder
    socket.emit('message', {
      message: 'Herkese merhaba!',
      chatRoomName: 'Genel Sohbet', // Önceden oluşturulmuş bir oda olmalı
      senderId: '60c72b2f9b1d8c001f8e4c6a', // Geçerli bir kullanıcı ID'si olmalı
    });
  });

  // Yeni mesajları dinle
  socket.on('message', (data) => {
    console.log('Yeni mesaj geldi:', data);
  });

  // Hataları dinle
  socket.on('error', (error) => {
    console.error('Bir hata oluştu:', error.message);
  });
</script>
```

## Lisans

Bu proje [MIT](LICENSE) lisansı ile lisanslanmıştır.
