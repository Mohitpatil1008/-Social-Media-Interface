document.addEventListener("DOMContentLoaded", () => {
    showHome();
    displayProfilePosts();
});

function showProfile() {
    hideAllSections();
    document.getElementById("profile-section").classList.add("visible");
}

function showHome() {
    hideAllSections();
    document.getElementById("home-section").classList.add("visible");
}

function showNotifications() {
    hideAllSections();
    document.getElementById("notifications-section").classList.add("visible");
}

function hideAllSections() {
    document.querySelectorAll(".section").forEach(section => {
        section.classList.remove("visible");
    });
}

function likePost(button) {
    const likeCountSpan = button.querySelector(".like-count");
    let likeCount = parseInt(likeCountSpan.textContent);
    likeCount++;
    likeCountSpan.textContent = likeCount;
    addNotification("Mohit Patil liked your post");
}

function toggleComments(button) {
    const post = button.closest(".post");
    const commentsSection = post.querySelector(".post-comments");
    commentsSection.classList.toggle("hidden");
}

function sharePost(button) {
    const post = button.closest(".post");
    const postImageSrc = post.querySelector(".post-image").src;
    const profilePostsGrid = document.querySelector(".profile-posts-grid");

    const sharedPost = document.createElement("img");
    sharedPost.src = postImageSrc;
    sharedPost.alt = "Shared Post";
    profilePostsGrid.appendChild(sharedPost);

    addNotification("Mohit Patil shared your post");
}

function toggleFollow() {
    const followButton = document.querySelector('.follow-btn');
    const followersCountSpan = document.getElementById("followers-count");
    let followersCount = parseInt(followersCountSpan.textContent);

    if (followButton.textContent === "Follow") {
        followButton.textContent = "Following";
        followButton.classList.add("following");
        followersCount++;
    } else {
        followButton.textContent = "Follow";
        followButton.classList.remove("following");
        followersCount--;
    }

    followersCountSpan.textContent = followersCount;
}

function postComment(button) {
    const post = button.closest(".post");
    const commentInput = post.querySelector(".comment-input");
    const commentList = post.querySelector(".comment-list");
    const commentText = commentInput.value;

    if (commentText) {
        const commentItem = document.createElement("div");
        commentItem.classList.add("comment-item");
        commentItem.textContent = commentText;
        commentList.appendChild(commentItem);
        commentInput.value = '';

        addNotification(`Mohit Patil commented: "${commentText}"`);
    }
}

function addNotification(message) {
    const notification = document.createElement("div");
    notification.classList.add("notification");
    notification.textContent = message;
    document.querySelector(".notifications-list").appendChild(notification);
}

function displayProfilePosts() {
    const profilePostsGrid = document.querySelector(".profile-posts-grid");
    const homePosts = document.querySelectorAll(".post-image");

    homePosts.forEach(postImage => {
        const profilePost = document.createElement("img");
        profilePost.src = postImage.src;
        profilePost.alt = "Profile Post";
        profilePost.classList.add("profile-post");
        profilePostsGrid.appendChild(profilePost);

        profilePost.addEventListener("click", () => {
            showPostDetail(postImage.src);
        });
    });
}

function showPostDetail(imageSrc) {
    showHome();
    const postImages = document.querySelectorAll(".post-image");
    postImages.forEach(postImage => {
        if (postImage.src === imageSrc) {
            postImage.scrollIntoView({ behavior: 'smooth' });
        }
    });
}
