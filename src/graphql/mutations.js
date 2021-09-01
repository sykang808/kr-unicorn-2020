/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createContent = /* GraphQL */ `
  mutation CreateContent(
    $input: CreateContentInput!
    $condition: ModelContentConditionInput
  ) {
    createContent(input: $input, condition: $condition) {
      id
      name
      description
      s3img
      usedService
      categorty
      contentType
      comments {
        nextToken
      }
      like {
        nextToken
      }
      likecount
      owner
      status
      link
      photos {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateContent = /* GraphQL */ `
  mutation UpdateContent(
    $input: UpdateContentInput!
    $condition: ModelContentConditionInput
  ) {
    updateContent(input: $input, condition: $condition) {
      id
      name
      description
      s3img
      usedService
      categorty
      contentType
      comments {
        nextToken
      }
      like {
        nextToken
      }
      likecount
      owner
      status
      link
      photos {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteContent = /* GraphQL */ `
  mutation DeleteContent(
    $input: DeleteContentInput!
    $condition: ModelContentConditionInput
  ) {
    deleteContent(input: $input, condition: $condition) {
      id
      name
      description
      s3img
      usedService
      categorty
      contentType
      comments {
        nextToken
      }
      like {
        nextToken
      }
      likecount
      owner
      status
      link
      photos {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const createComment = /* GraphQL */ `
  mutation CreateComment(
    $input: CreateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    createComment(input: $input, condition: $condition) {
      id
      contentID
      feedback
      owner
      createdAt
      updatedAt
    }
  }
`;
export const updateComment = /* GraphQL */ `
  mutation UpdateComment(
    $input: UpdateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    updateComment(input: $input, condition: $condition) {
      id
      contentID
      feedback
      owner
      createdAt
      updatedAt
    }
  }
`;
export const deleteComment = /* GraphQL */ `
  mutation DeleteComment(
    $input: DeleteCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    deleteComment(input: $input, condition: $condition) {
      id
      contentID
      feedback
      owner
      createdAt
      updatedAt
    }
  }
`;
export const createLike = /* GraphQL */ `
  mutation CreateLike(
    $input: CreateLikeInput!
    $condition: ModelLikeConditionInput
  ) {
    createLike(input: $input, condition: $condition) {
      id
      contentID
      owner
      createdAt
      updatedAt
    }
  }
`;
export const updateLike = /* GraphQL */ `
  mutation UpdateLike(
    $input: UpdateLikeInput!
    $condition: ModelLikeConditionInput
  ) {
    updateLike(input: $input, condition: $condition) {
      id
      contentID
      owner
      createdAt
      updatedAt
    }
  }
`;
export const deleteLike = /* GraphQL */ `
  mutation DeleteLike(
    $input: DeleteLikeInput!
    $condition: ModelLikeConditionInput
  ) {
    deleteLike(input: $input, condition: $condition) {
      id
      contentID
      owner
      createdAt
      updatedAt
    }
  }
`;
export const createPhoto = /* GraphQL */ `
  mutation CreatePhoto(
    $input: CreatePhotoInput!
    $condition: ModelPhotoConditionInput
  ) {
    createPhoto(input: $input, condition: $condition) {
      id
      album {
        id
        name
        description
        s3img
        usedService
        categorty
        contentType
        likecount
        owner
        status
        link
        createdAt
        updatedAt
      }
      bucket
      fullsize {
        key
        width
        height
      }
      thumbnail {
        key
        width
        height
      }
      createdAt
      updatedAt
    }
  }
`;
export const updatePhoto = /* GraphQL */ `
  mutation UpdatePhoto(
    $input: UpdatePhotoInput!
    $condition: ModelPhotoConditionInput
  ) {
    updatePhoto(input: $input, condition: $condition) {
      id
      album {
        id
        name
        description
        s3img
        usedService
        categorty
        contentType
        likecount
        owner
        status
        link
        createdAt
        updatedAt
      }
      bucket
      fullsize {
        key
        width
        height
      }
      thumbnail {
        key
        width
        height
      }
      createdAt
      updatedAt
    }
  }
`;
export const deletePhoto = /* GraphQL */ `
  mutation DeletePhoto(
    $input: DeletePhotoInput!
    $condition: ModelPhotoConditionInput
  ) {
    deletePhoto(input: $input, condition: $condition) {
      id
      album {
        id
        name
        description
        s3img
        usedService
        categorty
        contentType
        likecount
        owner
        status
        link
        createdAt
        updatedAt
      }
      bucket
      fullsize {
        key
        width
        height
      }
      thumbnail {
        key
        width
        height
      }
      createdAt
      updatedAt
    }
  }
`;
