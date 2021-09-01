/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateContent = /* GraphQL */ `
  subscription OnCreateContent {
    onCreateContent {
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
export const onUpdateContent = /* GraphQL */ `
  subscription OnUpdateContent {
    onUpdateContent {
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
export const onDeleteContent = /* GraphQL */ `
  subscription OnDeleteContent {
    onDeleteContent {
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
export const onCreateComment = /* GraphQL */ `
  subscription OnCreateComment {
    onCreateComment {
      id
      contentID
      feedback
      owner
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateComment = /* GraphQL */ `
  subscription OnUpdateComment {
    onUpdateComment {
      id
      contentID
      feedback
      owner
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteComment = /* GraphQL */ `
  subscription OnDeleteComment {
    onDeleteComment {
      id
      contentID
      feedback
      owner
      createdAt
      updatedAt
    }
  }
`;
export const onCreateLike = /* GraphQL */ `
  subscription OnCreateLike {
    onCreateLike {
      id
      contentID
      owner
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateLike = /* GraphQL */ `
  subscription OnUpdateLike {
    onUpdateLike {
      id
      contentID
      owner
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteLike = /* GraphQL */ `
  subscription OnDeleteLike {
    onDeleteLike {
      id
      contentID
      owner
      createdAt
      updatedAt
    }
  }
`;
export const onCreatePhoto = /* GraphQL */ `
  subscription OnCreatePhoto {
    onCreatePhoto {
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
export const onUpdatePhoto = /* GraphQL */ `
  subscription OnUpdatePhoto {
    onUpdatePhoto {
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
export const onDeletePhoto = /* GraphQL */ `
  subscription OnDeletePhoto {
    onDeletePhoto {
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
