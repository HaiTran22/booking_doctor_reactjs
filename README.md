I. Hướng dẫn cài đặt
1. Mở TERMINAL
2. Gõ lệnh `npm install` để cài đặt tất cả các package trong file package.json
3. Gõ lệnh `npm start` để chạy dự án

II. Các tools sử dụng ở phần FE
1. Lightbox
    Là hộp đèn React có thể tùy chỉnh, đáp ứng đầy đủ với các tùy chọn thu phóng và theo chủ đề trực quan
    Câu lệnh cài đặt: `npm i react-image-lightbox`
2. Markdown
    Markdown là ngôn ngữ đánh dấu văn bản đã có mặt từ rất lâu, với cú pháp đơn giản, dễ hiểu nên đã được nhiều người biết đến và được sử dụng khá phổ biến. Đây là loại ngôn ngữ đánh dấu văn bản được tạo ra vào năm 2004 bởi John Gruber.
    Câu lệnh cài đặt: `npm i markdown-it`
3. Google maps
    Là một một dịch vụ bản đồ số được phát hành bởi ông lớn Google, với mục đích thay thế các bản đồ giấy thông thường trong bối cảnh nền công nghệ và mạng Internet ngày càng phát triển mạnh mẽ.
    Câu lệnh cài đặt: `npm i react-google-maps`
4. Loading overlay
    Là lớp phủ tải đơn giản, có thể tùy chỉnh với công cụ quay vòng và chuyển tiếp.
    Câu lệnh cài đặt: `npm i react-loading-overlay`
5. React toastify
    React-Toastify cho phép bạn dễ dàng thêm thông báo vào ứng dụng của mình để hiển thị cảnh báo, lỗi, thông báo thành công và các thông tin có giá trị khác.
    Câu lệnh cài đặt: `npm i react-toastify`
6. Slick
    Slick là một thự viện javascript rất phổ biến dùng để tạo carousel một cách hiệu quả và dễ dàng.
    Câu lệnh cài đặt: `npm i slick-carousel`
7. React icon
    Các biểu tượng được sử dụng trong hầu hết các ứng dụng và trang web. Một trong những công cụ tốt nhất hiện có để thêm các biểu tượng vào ứng dụng React là thư viện React Icons. Các icon được lấy từ trang `https://fontawesome.com`
    Câu lệnh cài đặt: `npm i react-icons`
8. Axios
    Axios là một thư viện HTTP Client dựa trên Promise. Cơ bản thì nó cung cấp một API cho việc xử lý XHR (XMLHttpRequests).
    Câu lệnh cài đặt: `npm i axios`
9. Base-64
    Base64 là phương thức convert dạng mã hóa 2 chiều từ binary sang string để có thể gửi đi được trong network một cách dễ dàng. Các binary lúc này sẽ được thể hiện bằng các ký tự mã ASCII.
    Câu lệnh cài đặt: `npm i base-64`

III. Giới thiệu Git: * Tóm tắt: - Git dùng để quản lý phiên bản code, rất thuận lợi trong làm việc nhóm thậm chí làm 1 mình. Git có nhiều trang hỗ trợ như: github.com, bitbucket.com, ... không phải git là chỉ riêng trang github, git giống như là 1 chuẩn quản lý phiên bản, ngoài ra còn có SVN là 1 chuẩn khác để quản lý phiên bản (theo cách hiểu của t). II. Các khái niệm trong git: + Repository (kho): là thư mục. Thư mục trên github.com gọi là remote (xa) repository (kho), còn ở máy tính là local repository. + Branch (nhánh): ví dụ t làm 1 phần trên 1 nhánh, m rẽ sang nhánh khác làm chức năng khác, sau này hộp lại (merge) + Remote (máy chủ): khỏi giải thích, lát ví dụ + add (thêm): sau khi làm gì đó thay đổi thì add (thêm) cái thay đổi đó vào + commit: chốt thay đổi + pull (kéo về): lấy code của thằng làm chung đã push (đẩy) lên. Pull từ từ branch nào về branch hiện tại cũng được, nếu pull từ branch khác thì sẽ có "Merge" xảy ra, còn pull từ cũng branch thì là như update code base. Khi mình làm thay đổi dưới local trùng với chỗ người nào đó đã sửa và push lên (nhưng mình chưa pull về trước đó), thì khi pull về sẽ có "conflict". "Conflict" nghĩa là "đụng độ". Khi code pull về bị conflict, cần phải "Resolve conflict" bằng cách chọn thay đổi nào được giữ lại và thay đổi nào sẽ xóa đi hoặc giữ lại cả 2 và chỉnh sửa cho tụi nó hoạt động. + push (đẩy): đưa code lên remote repository, nghĩa là đẩy lên cho tụi kia kéo về + Collaborators: làm việc nhóm với git như nào: + ai tạo repos thì vào đây: https://github.com/<tên_tài_khoản>/<tên_repos>/settings/collaboration + gõ email github thành viên vào, thằng được mời làm chung đồng ý thì làm thôi.

IV. Ví dụ thực tế: + Tải git về cài vào máy: https://git-scm.com/ + Tiếp là phải tạo 1 remote repository (thư mục trên github.com) đó là chỗ lúc push code sẽ lên, repository đó có 1 đừờng dẫn, đuôi là *.git. ví du: https://github.com/Haosvit/QLPV.git. Việc tạo này phải tạo trên trang github.com, lên đó tìm nút tạo ("New repository"). + Tạo 1 thư mục để chứa code dưới máy tính. Thư mục này sẽ liên kết với cái thư mục trên github sau này (làm theo các bước dưới) + Khởi tạo git trong thư mục mới tạo: Bấm chuột phải chọn "Git bash here" để mở màn hình console. Gõ: git init + Liên kết nó với thư mục ở github.com: cũng ở màn hình consolde mới mở lên, gõ: git remote add origin <đường dẫn tới thư mục trên github.com> ví dụ: git remote add origin https://github.com/Haosvit/QLPV.git + Sau khi liên kết 2 thư mục, lấy hết nội dung trên thư mục ở github về, trên console, gõ: git pull origin master + xong, đã lấy hết nội dung thư mục trên github về. + Khi làm gì đó thay đổi trên thư mục ở máy nhà, phải ADD sau đó COMMIT sau đó PUSH lên github. Làm như sau: ADD: mở git bash (màn hình console) lên, gõ: git add * COMMIT: cũng trên bash, gõ: git commit -m "nội dụng đã thực hiện" trong đó cái trong dấu ngoặc kép là ghi chú của việc commit, cái này bắt buộc nhập PUSH: cũng trên bash, gõ: git push origin master + Khi ai đó push gì mới lên thì ở máy lấy về bằng cách: gõ trên bash tại thư mục đã khởi tạo git (git init): git pull origin master + Hết, luyện tập bằng cách tạo 1 repo trống trên github cá nhân.

