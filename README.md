# Koleksiyon Platform

Bu proje, kullanıcıların kendi koleksiyonlarını oluşturup yönetebilecekleri modern bir web uygulamasıdır.

## Gerçekleştirilen Gereksinimler ✅

1. **Teknoloji Seçimleri**
   - Next.js framework'ü başarıyla kullanıldı
   - TypeScript ile tip güvenliği sağlandı
   - Tailwind CSS ile modern ve responsive tasarım uygulandı
   - NextAuth.js ile kimlik doğrulama sistemi entegre edildi

2. **Login Sayfası**
   - Email ve şifre alanları içeren form oluşturuldu
   - NextAuth.js entegrasyonu yapıldı
   - Hata mesajları için gerekli kontroller eklendi
   - Başarılı girişte koleksiyon listesine yönlendirme sağlandı

3. **Koleksiyonlar Sayfası**
   - Koleksiyonların listelendiği tablo görünümü oluşturuldu
   - "Sabitleri Düzenle" butonu ve yönlendirmesi eklendi

4. **Koleksiyon Listesi Düzenleme Ekranı**
   - Sürükle-bırak (drag-and-drop) özelliği eklendi
   - Filtreleme paneli oluşturuldu
   - Kaydet ve Vazgeç butonları eklendi
   - Modal ile request gösterimi sağlandı

## Farklılaştığımız Noktalar 🔄

1. **State Yönetimi**
   - İstenen: Zustand veya Redux
   - Uygulanan: Context API
   - Gerekçe: Context API konusunda daha deneyimli olduğum için ve projenin ölçeği için yeterli olacağını düşündüğüm için bu tercihi yaptım.

## Eksik Kalan Gereksinimler ⚠️

1. **Dockerizasyon**
   - Docker ve Docker Compose yapılandırması henüz tamamlanmadı
   - Local deployment için gerekli dosyalar eklenmedi

## Kurulum ve Çalıştırma

```bash
# Bağımlılıkları yükleyin
npm install

# Geliştirme sunucusunu başlatın
npm run dev
```

Uygulama varsayılan olarak [http://localhost:3000](http://localhost:3000) adresinde çalışacaktır.


## Katkıda Bulunma

1. Bu repository'yi fork edin
2. Feature branch'i oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add some amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
